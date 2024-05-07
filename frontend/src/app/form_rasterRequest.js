'use client';
import React, { useState } from "react";

export default function RasterRequestForm({ sessionId }) {
    const [rasterInfo, setRasterInfo] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        data.append("session_id", sessionId);
        console.log(data);
        const response = await fetch("http://127.0.0.1:8000/api/rasterrequest/", {
            method: "POST",
            body: data
        });
        alert("Request Finished.");
        const status = response.status;
        if (status !== 200) {
            alert("Request Failed. Status code: " + status);
            return;
        }
        const result = await response.json();
        console.log(result);
        setRasterInfo(result.info);
    }

    return (
        <>
            <h3>Variable</h3>
            <form onSubmit={handleSubmit}>
                <label> Variable:
                    <select name="variable" defaultValue={"2m_temperature"}>
                        <option value="2m_temperature">2m temperature</option>
                        <option value="total_precipitation">Total precipitation</option>
                    </select>
                </label>
                <br />
                <h3>Spatial</h3>
                <label> North Latitude:
                    <input name="north" type="number" defaultValue={80} />
                </label>
                <br />
                <label> South Latitude:
                    <input name="south" type="number" defaultValue={60} />
                </label>
                <br />
                <label> West Longitude:
                    <input name="west" type="number" defaultValue={-60} />
                </label>
                <br />
                <label> East Longitude:
                    <input name="east" type="number" defaultValue={-20} />
                </label>
                <br />
                <label> Spatial Resolution (degree):
                    <label>
                        <input name="spatial_resolution" type="radio" value="0.25" />
                        0.25
                    </label>
                    <label>
                        <input name="spatial_resolution" type="radio" value="0.5" />
                        0.5
                    </label>
                    <label>
                        <input name="spatial_resolution" type="radio" value="1" />
                        1
                    </label>
                    <label>
                        <input name="spatial_resolution" type="radio" value="2" />
                        2
                    </label>
                </label>
                <br />
                <label> Spatial Aggregation:
                    <label>
                        <input name="spatial_agg_method" type="radio" value="mean" />
                        mean
                    </label>
                    <label>
                        <input name="spatial_agg_method" type="radio" value="max" />
                        max
                    </label>
                    <label>
                        <input name="spatial_agg_method" type="radio" value="min" />
                        min
                    </label>
                </label>
                <br />

                <h3>Temporal</h3>
                <label> Start DateTime:
                    <input name="start_datetime" type="datetime-local" defaultValue="2023-01-01 00:00" />
                </label>
                <br />
                <label> End DateTime:
                    <input name="end_datetime" type="datetime-local" defaultValue="2023-01-05 00:00" />
                </label>
                <br />
                <label> Temporal Resolution (hour):
                    <label>
                        <input name="temporal_resolution" type="radio" value="hour" />
                        hour
                    </label>
                    <label>
                        <input name="temporal_resolution" type="radio" value="day" />
                        day
                    </label>
                    <label>
                        <input name="temporal_resolution" type="radio" value="month" />
                        month
                    </label>
                    <label>
                        <input name="temporal_resolution" type="radio" value="year" />
                        year
                    </label>
                </label>
                <br />
                <label> Temporal Aggregation:
                    <label>
                        <input name="temporal_agg_method" type="radio" value="mean" />
                        mean
                    </label>
                    <label>
                        <input name="temporal_agg_method" type="radio" value="max" />
                        max
                    </label>
                    <label>
                        <input name="temporal_agg_method" type="radio" value="min" />
                        min
                    </label>
                </label>
                <br />
                <h3>Submit</h3>
                <button type="submit">Submit</button>
            </form>
            <h3> Raster info: </h3>
            <pre >{rasterInfo}</pre>
        </>
    )
}
