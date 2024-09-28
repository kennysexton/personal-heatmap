import geojson
import argparse

def combine_geojson_files(file1, file2, output_file):
  """Combines two GeoJSON files into a single FeatureCollection.

  Args:
      file1 (str): Path to the first GeoJSON file.
      file2 (str): Path to the second GeoJSON file.
      output_file (str): Path to the output GeoJSON file.
  """

  with open(file1, 'r') as f:
    data1 = geojson.load(f)

  with open(file2, 'r') as f:
    data2 = geojson.load(f)

  # Ensure both files are FeatureCollections
  if not isinstance(data1, geojson.FeatureCollection):
    data1 = geojson.FeatureCollection(data1)
  if not isinstance(data2, geojson.FeatureCollection):
    data2 = geojson.FeatureCollection(data2)

  # Combine the features from both FeatureCollections
  combined_features = data1.features + data2.features
  combined_data = geojson.FeatureCollection(combined_features)

  with open(output_file, 'w') as f:
    geojson.dump(combined_data, f)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Combine two GeoJSON files")
    parser.add_argument("file1", help="Path to the first GeoJSON file")
    parser.add_argument("file2", help="Path to the second GeoJSON file")
    parser.add_argument("output_file", help="Path to the output GeoJSON file")
    args = parser.parse_args()

    combine_geojson_files(args.file1, args.file2, args.output_file)
