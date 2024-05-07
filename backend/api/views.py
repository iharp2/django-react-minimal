from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import RasterRequest
from .serializers import RasterRequestSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
import rest_framework.status as status
from datetime import datetime
from data_access.access import raster_data_access_multiple_files
import random

# in-memory mapping: session_id -> raster
session_raster_map = {}

# Create your views here.


# simple static html page: /api/home/
def home(request):
    return HttpResponse("<h1>Hello, World!</h1>")


# API (GET, POST): /api/listcreate/ (generic view)
class RasterRequestListCreate(generics.ListCreateAPIView):
    queryset = RasterRequest.objects.all()
    serializer_class = RasterRequestSerializer


# API (POST): /api/rasterrequest/
@api_view(["POST"])
def raster_request(request):
    if request.method == "POST":
        serializer = RasterRequestSerializer(data=request.data)
        print(repr(serializer))
        if serializer.is_valid():
            serializer.save()
            variable = serializer.data.get("variable")
            north = serializer.data.get("north")
            south = serializer.data.get("south")
            west = serializer.data.get("west")
            east = serializer.data.get("east")
            spatial_resolution = serializer.data.get("spatial_resolution")
            spatial_agg_method = serializer.data.get("spatial_agg_method")
            start_datetime = serializer.data.get("start_datetime")
            end_datetime = serializer.data.get("end_datetime")
            temporal_resolution = serializer.data.get("temporal_resolution")
            temporal_agg_method = serializer.data.get("temporal_agg_method")
            session_id = serializer.data.get("session_id")

            # call the data access function
            raster = raster_data_access_multiple_files(
                variable=variable,
                min_lat=float(south),
                max_lat=float(north),
                min_lon=float(west),
                max_lon=float(east),
                spatial_resolution=float(spatial_resolution),
                spatial_agg_method=spatial_agg_method,
                start_datetime=start_datetime,
                end_datetime=end_datetime,
                time_resolution=temporal_resolution,
                time_agg_method=temporal_agg_method,
            )
            print(raster)
            print(session_id)
            session_raster_map[session_id] = raster
            response = {"message": f"Raster requested at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", "info": raster.__str__()}
            return Response(response, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


# API (GET): /api/rasterdownload/
@api_view(["GET"])
def raster_download(request):
    if request.method == "GET":
        session_id = request.query_params.get("session_id")
        raster = session_raster_map.get(session_id)
        if raster is not None:
            file_name = f"for_download_{session_id}.nc"
            file_path = f"/Users/yuchuanhuang/Github/django-react-minimal/frontend/public/temp/for_download/{file_name}"
            raster.to_netcdf(path=file_path)
            response = {"message": f"Raster created for download", "file_name": file_name}
            return Response(response, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


# API (GET): /api/gensessionid/
@api_view(["GET"])
def generate_session_id(request):

    def gen_uuid():
        epoch_seconds = int(datetime.now().timestamp())
        random_part = random.SystemRandom().randint(1000, 9999)
        return f"{epoch_seconds}_{random_part}"

    if request.method == "GET":
        session_id = gen_uuid()
        while session_id in session_raster_map:
            session_id = gen_uuid()
        print(session_id)
        session_raster_map[session_id] = None
        response = {"session_id": session_id}
        return Response(response, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
