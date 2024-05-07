from rest_framework import serializers
from .models import RasterRequest


class RasterRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RasterRequest
        fields = "__all__"
