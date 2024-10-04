import geojson
import argparse
import os
import constants

def combine_geojson_files(target_folder, activity_type):
    """Combines GeoJSON files in a target folder based on activity type.

    Args:
        target_folder (str): Path to the target folder.
        activity_type (str): Activity type. (Running, biking, etc.)
    """
    combined = 0
    combined_features = []
    for filename in os.listdir(target_folder):
        # Must be the same activity type
        if filename.endswith('.geojson') and activity_type in filename.lower():
            # Only want to combine partials
            for fileType in constants.SUPPORTED_FILE_FORMATS:
                if fileType in filename.lower():
                    
                  with open(os.path.join(target_folder, filename), 'r') as f:
                    data = geojson.load(f)

                  # Ensure the file is a FeatureCollection
                  if not isinstance(data, geojson.FeatureCollection):
                      data = geojson.FeatureCollection(data)

                  combined_features.extend(data.features)
                  combined += 1

    combined_data = geojson.FeatureCollection(combined_features)

    output_file = os.path.join(target_folder, f"{activity_type}_combined.geojson")
    try:
      with open(output_file, 'w') as f:
          geojson.dump(combined_data, f)
    except Exception as e:
      print(f"Error writting to output: {e}")

    print(f"Found and combined {combined} .geojson files of type {activity_type}")

if __name__ == '__main__':
    target_folder = constants.CONVERSION_OUTPUT_PATH

    parser = argparse.ArgumentParser(description="Combine GeoJSON files based on activity type")
    parser.add_argument("activity_type", help="Activity type")
    args = parser.parse_args()

    combine_geojson_files(target_folder, args.activity_type)