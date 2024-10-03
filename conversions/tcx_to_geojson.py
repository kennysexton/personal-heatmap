import os
from xml.dom import minidom
import geojson
import argparse
import utils

def convert_folder(input_folder, output_file, activityType):
    """Converts all TCX files in a folder to a single GeoJSON file with lines.

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
        if filename.endswith('.tcx'):
            total_files += 1
            tcx_file = os.path.join(input_folder, filename)

            # print(filename)

            try:
                with open(tcx_file, 'r') as f:
                    tcx_data = f.read().strip()  # Remove leading and trailing whitespace
                tcx = minidom.parseString(tcx_data)
            except Exception as e:
                print(f"Error parsing TCX file: {e}")
                skipped += 1
                continue

            activity_node = tcx.getElementsByTagName("Activity")[0]
            if activity_node.getAttribute("Sport").lower() != activityType:
                skipped += 1
                continue # Skip non-running activities


            trackpoints = activity_node.getElementsByTagName("Trackpoint")
            coordinates = []
            for trackpoint in trackpoints:
                latitude_node = trackpoint.getElementsByTagName("LatitudeDegrees")[0]
                longitude_node = trackpoint.getElementsByTagName("LongitudeDegrees")[0]
                latitude = float(latitude_node.firstChild.nodeValue)
                longitude = float(longitude_node.firstChild.nodeValue)
                coordinates.append((utils.coordinateRounder(longitude), utils.coordinateRounder(latitude)))

            features.append(
                geojson.Feature(
                    geometry=geojson.LineString(coordinates),
                )
            )
            converted += 1

    fc = geojson.FeatureCollection(features)

    try:
        with open(output_file, 'w') as f:
            geojson.dump(fc, f)
    except Exception as e:
        print(f"Error writting to output: {e}")

    utils.output_printer(total_files, converted, skipped)

if __name__ == '__main__':
    input_folder = './activity_data'
    output_file = './conversions/outputs/tcx_output.geojson'

        # Activity Type
    parser = argparse.ArgumentParser(description="What activity type are you looking to convert?")
    parser.add_argument("activityType", help="Activity type. Ex. running")
    args = parser.parse_args()

    convert_folder(input_folder, output_file, args.activityType)