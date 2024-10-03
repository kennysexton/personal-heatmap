import os
import gpxpy
import geojson
import argparse
import utils

def convert_folder(input_folder, output_file, activityType):
    """Converts all GPX files in a folder to a single GeoJSON file with lines.

    Args:
        input_folder (str): Path to the input folder.
        output_file (str): Path to the output GeoJSON file.
        activityType (str): Activity type. (Running,biking, ect)
    """
    total_files = 0
    skipped = 0
    converted = 0

    features = []
    for filename in os.listdir(input_folder):
        if filename.endswith('.gpx'):
            total_files += 1
            gpx_file = os.path.join(input_folder, filename)
            with open(gpx_file, 'r') as f:
                gpx = gpxpy.parse(f)

            if gpx.tracks[0].type.lower() != activityType:
                skipped += 1
                continue

            for track in gpx.tracks:
                for segment in track.segments:
                    coordinates = [(utils.coordinateRounder(point.longitude), utils.coordinateRounder(point.latitude)) for point in segment.points]
                    features.append(
                        geojson.Feature(
                            geometry=geojson.LineString(coordinates),
                        )
                    )
                    converted += 1

    fc = geojson.FeatureCollection(features)

    with open(output_file, 'w') as f:
        geojson.dump(fc, f)

    utils.output_printer(total_files, converted, skipped)

if __name__ == '__main__':
    input_folder = './activity_data'
    output_file = './conversions/outputs/gpx_output.geojson'

    # Activity Type
    parser = argparse.ArgumentParser(description="What activity type are you looking to convert?")
    parser.add_argument("activityType", help="Activity type. Ex. running")
    args = parser.parse_args()

    convert_folder(input_folder, output_file, args.activityType)