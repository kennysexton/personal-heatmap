# This will be shown on sucessful run of the conversion script
def output_printer(total, converted, skipped, failed = 0):
    if(failed == 0):
        print(f"Converted: {converted}/{total}, Skipped: {skipped}")
    else:
        print(f"Converted: {converted}/{total}, Skipped: {skipped}, failed: {failed}")


# Set to 5 digits of rounding if running into performance problems
def coordinateRounder(num, digits = 5):
    return round(num, digits)


# .fit and .gpx use the term cycling instead of biking
# .fit records are marked as walks even if they are hikes
def getActivityType(activityType, fileFormat):
    if(activityType == "biking"):
        return "cycling"
    elif(activityType == "hiking" and fileFormat=='fit'):
        return "walking"
    else:
        return activityType