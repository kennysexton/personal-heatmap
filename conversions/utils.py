# This will be shown on sucessful run of the conversion script
def output_printer(total, converted, skipped, failed = 0):
    if(failed == 0):
        print(f"Converted: {converted}/{total}")
    else:
        print(f"Converted: {converted}/{total}, failed: {failed}")


# Set to 5 digits of rounding if running into performance problems
def coordinateRounder(num, digits = 5):
    return round(num, digits)


# .fit and .gpx use the term cycling instead of biking
# .fit records are marked as walks even if they are hikes (my watch does not have a hike option)
def checkNotMatchingActivityType(fileActivityType, userSelection):

    bikingOptions = ["cycling" , "biking"]
    walkingOptions = ["walking", "hiking", "other"]

    if(userSelection == "biking"):
        if(fileActivityType.lower() in bikingOptions):
            return False
    elif(userSelection == "walking"):
        if(fileActivityType.lower() in walkingOptions):
            return False
    elif(userSelection == "skiing"):
        if("ski" in fileActivityType):
            return False
        
    # Not defined, check only for direct match
    return fileActivityType.lower() != userSelection