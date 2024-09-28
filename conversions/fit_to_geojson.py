import os
import fitparse
import geojson

def convert_folder(input_folder, output_file):
    """Converts all .fit files in a folder to a single GeoJSON file with lines.

    Args:
        input_folder (str): Path to the input folder.
        output_file (str): Path to the output GeoJSON file.
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
            

                    # Empty list of coordinates
                    coordinates = []
                    for record in fitfile.get_messages("record"):
                    # Records can contain multiple pieces of data (ex: timestamp, latitude, longitude, etc)

                        for data in record:

                            #Print the name and value of the data (and the units if it has any)
                            # if data.units:
                            #     print(" * {}: {} ({})".format(data.name, data.value, data.units))
                            # else:
                            #     print(" * {}: {}".format(data.name, data.value))


                            if(data.name ==  "position_lat" and data.value is not None):
                                latitude = semicircles_tolatLong(data.value)
                            elif(data.name ==  "position_long" and data.value is not None):
                                longitude = semicircles_tolatLong(data.value)

                            if(latitude != 0 and latitude != 0):
                                coordinates.append((longitude, latitude))
                                # Reset values
                                latitude = 0
                                longitude = 0


                    features.append(
                        geojson.Feature(
                            geometry=geojson.LineString(coordinates),
                        )
                    )
                    converted += 1

            except Exception as e:
                print(f"Error parsing FIT file: {e}")
                failed += 1
                continue

    fc = geojson.FeatureCollection(features)

    with open(output_file, 'w') as f:
        geojson.dump(fc, f)

    print(f"Total files: {total_files}")
    print(f"Converted files: {converted}")
    print(f"Skipped files: {skipped}")
    print(f"Failed files: {failed}")


def semicircles_tolatLong(semicircle):
    """Converts the given unit using the formula semicircle * (180 / 2^31).

    Thanks to https://gis.stackexchange.com/questions/156887/conversion-between-semicircles-and-latitude-units
    """

    return semicircle * (180 / (2**31))

if __name__ == '__main__':
    input_folder = '../activity_data'
    output_file = './outputs/fit_output.geojson'
    convert_folder(input_folder, output_file)