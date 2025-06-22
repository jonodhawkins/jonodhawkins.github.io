import geopandas
import os
import pathlib

if __name__ == "__main__":#

    root_dir = pathlib.Path(__file__).parent
    raw_dir = root_dir / pathlib.Path("gpx")
    proc_dir = root_dir / pathlib.Path("geojson")

    print(f"Converting .gpx files to .geojson in {root_dir}")

    for file in os.listdir(raw_dir):
        # Iterate over files in gpx directory
        if file[-4:] == ".gpx":
            print(f"Converting {file}")
            gpd_file = geopandas.read_file(raw_dir / file, layer="tracks")
            geojson_name = file.rstrip(".gpx") + ".geojson"
            # and convert to geojson
            gpd_file.to_file(proc_dir / geojson_name)
            