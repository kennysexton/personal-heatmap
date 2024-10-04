import os
import fitparse
import argparse

def convert_folder(filePath):
    """Helper file for printing out binary .fit files

    Args:
        filePath (str): Name of a file inside of activity_data folder
    """


    fit_file = filePath

    try:
        with open(fit_file, 'rb') as f:
            fitfile = fitparse.FitFile(f)
    
            for record in fitfile.get_messages("session"):
            # Records can contain multiple pieces of data (ex: timestamp, latitude, longitude, etc)

                for data in record:

                    # Print the name and value of the data (and the units if it has any)
                    if data.units:
                        print(" * {}: {} ({})".format(data.name, data.value, data.units))
                    else:
                        print(" * {}: {}".format(data.name, data.value))

                    if data.name == "sport" and data.value == "running":
                        print("found a run")
                        break
            



    except Exception as e:
        print(f"Error parsing FIT file: {e}")



if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Provide a filepath for a .fit file")
    parser.add_argument("filePath", help="Path to an unzipped .fit file")
    args = parser.parse_args()

    convert_folder(args.filePath)