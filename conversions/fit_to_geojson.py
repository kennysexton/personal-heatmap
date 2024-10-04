import os
import fitparse
import geojson
import argparse
import utils
import constants

def convert_folder(input_folder, output_file, activityType):
    """Converts all .fit files in a folder to a single GeoJSON file with lines.

    Args:
        input_folder (str): Path to the input folder.
        output_file (str): Path to the output GeoJSON file.
        activityType (str): Activity type. (Running,biking, ect)
    """
    total_files = 0
    skipped = 0
    converted = 0
    failed = 0

    latitude = 0
    longitude = 0
    features = []
    for filename in os.listdir(input_folder):

        if filename.endswith('.fit'):
            total_files += 1
            fit_file = os.path.join(input_folder, filename)

            try:
                with open(fit_file, 'rb') as f:
                    fitfile = fitparse.FitFile(f)

                    # Should be one session collection with the activity type
                    correct_sport = False
                    for session in fitfile.get_messages("session"):
                        for entry in session:
                            if entry.name == "sport" and entry.value.lower() == activityType:
                                correct_sport = True
                                break
            

                    if correct_sport:
                        # Empty list of coordinates
                        coordinates = []
                        is_first_record = True  # Fix for bug where .FIT files first coordinate sometimes is way of
                        for record in fitfile.get_messages("record"):
                        # Records can contain multiple pieces of data (ex: timestamp, latitude, longitude, etc)

                            for data in record:


                                if(data.name ==  "position_lat" and data.value is not None):
                                    latitude = semicircles_tolatLong(data.value)
                                elif(data.name ==  "position_long" and data.value is not None):
                                    longitude = semicircles_tolatLong(data.value)

                                if(latitude != 0 and latitude != 0):
                                    if(not is_first_record):
                                        coordinates.append((longitude, latitude))
                                    # Reset values
                                    latitude = 0
                                    longitude = 0
                                    is_first_record = False


                        features.append(
                            geojson.Feature(
                                geometry=geojson.LineString(coordinates),
                            )
                        )
                        converted += 1
                    else:
                        skipped+= 1

            except Exception as e:
                # print(f"Error parsing FIT file: {e}")
                failed += 1
                continue

    fc = geojson.FeatureCollection(features)

    try:
        with open(output_file, 'w') as f:
            geojson.dump(fc, f)
    except Exception as e:
        print(f"Error writting to output: {e}")

    utils.output_printer(total_files, converted, skipped, failed)


def semicircles_tolatLong(semicircle):
    """Converts the given unit using the formula semicircle * (180 / 2^31).

    Thanks to https://gis.stackexchange.com/questions/156887/conversion-between-semicircles-and-latitude-units
    """

    return utils.coordinateRounder(semicircle * (180 / (2**31)))

if __name__ == '__main__':

    # Activity Type
    parser = argparse.ArgumentParser(description="What activity type are you looking to convert?")
    parser.add_argument("activityType", help="Activity type. Ex. running")
    args = parser.parse_args()

    input_folder = constants.ACTIVITY_FILE_PATH
    output_file = f"{constants.CONVERSION_OUTPUT_PATH}/fit_{args.activityType}.geojson"

    convert_folder(input_folder, output_file, args.activityType)