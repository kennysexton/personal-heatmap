import gpxpy
import geojson

def gpx_to_geojson(gpx_file, geojson_file):
    """Converts a GPX file to a GeoJSON file with points.

    Args:
        gpx_file (str): Path to the GPX file.
        geojson_file (str): Path to the output GeoJSON file.
    """

    with open(gpx_file, 'r') as f:
        gpx = gpxpy.parse(f)

    features = []
    for track in gpx.tracks:
        for segment in track.segments:
            for point in segment.points:
                features.append(
                    geojson.Feature(
                        geometry=geojson.Point([point.longitude, point.latitude]),
                    )
                )

    fc = geojson.FeatureCollection(features)

    with open(geojson_file, 'w') as f:
        geojson.dump(fc, f)

if __name__ == '__main__':
    gpx_file = '../activity_data/activity_17113153901.gpx'  # Replace with your GPX file path
    geojson_file = '../activity_data/output.geojson'  # Replace with your desired GeoJSON file path
    gpx_to_geojson(gpx_file, geojson_file)