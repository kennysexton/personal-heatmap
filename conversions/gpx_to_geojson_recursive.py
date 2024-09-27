import os
import gpxpy
import geojson

def convert_folder(input_folder, output_file):
    """Converts all GPX files in a folder to a single GeoJSON file.

    Args:
        input_folder (str): Path to the input folder.
        output_file (str): Path to the output GeoJSON file.
    """

    features = []
    for filename in os.listdir(input_folder):
        if filename.endswith('.gpx'):
            gpx_file = os.path.join(input_folder, filename)
            with open(gpx_file, 'r') as f:
                gpx = gpxpy.parse(f)

            if gpx.tracks[0].type != "running":
                continue

            for track in gpx.tracks:
                for segment in track.segments:
                    for point in segment.points:
                        features.append(
                            geojson.Feature(
                                geometry=geojson.Point([point.longitude, point.latitude]),
                            )
                        )

    fc = geojson.FeatureCollection(features)

    with open(output_file, 'w') as f:
        geojson.dump(fc, f)

if __name__ == '__main__':
    input_folder = '../activity_data'
    output_file = './output.geojson'
    convert_folder(input_folder, output_file)