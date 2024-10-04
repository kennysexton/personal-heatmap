# This will be shown on sucessful run of the conversion script
def output_printer(total, converted, skipped, failed = 0):
    if(failed == 0):
        print(f"Total: {total}, Converted: {converted}, Skipped: {skipped}")
    else:
        print(f"Total: {total}, Converted: {converted}, Skipped: {skipped}, failed: {failed}")


# Set to 5 digits of rounding if running into performance problems
def coordinateRounder(num, digits = 5):
    return round(num, digits)
