# Batch image resize script
# Version 0.1
# J.D. Hawkins 04/07/2020
import os, re, yaml, string, PIL.Image, math

print("Running image_resize script (Version 0.1)")

photoIndex = "_data/photos.yml"
photoList = [];

with open(photoIndex, 'r') as file:
    photoList = yaml.load(file, Loader=yaml.FullLoader)

    for photo in photoList:
        cFilename = photo['filename']
        # Check whether the filename started with a forward slash
        preslashFlag = 0;
        if cFilename[0] == '/':
            # If it does then temporarily remove it and set flag
            preslashFlag = 1;
            cFilename = cFilename[1:]
        # Check if
        if not ('smallFilename' in photo):
            # print('No smallFilename attribute for ' + cFilename)
            # Find file extension
            filename, ext = os.path.splitext(cFilename)
            # Check whether the file is an image
            if ext.lower() in ['.jpg', '.png', '.bmp', '.gif']:
                # If so then resize
                smallFilename = filename + '-small' + ext
                if os.path.isfile(smallFilename):
                    print('Resized ' + filename + '-small' + ext + ' already exists.')
                else:
                    with PIL.Image.open(cFilename) as img:
                        # Get image size
                        xSize, ySize = img.size
                        # Always set xsize to 360 therefore
                        rsFactor = 360 / xSize;
                        newX = 360;
                        newY = math.floor(ySize * rsFactor);
                        # Resize image
                        newImg = img.resize((newX, newY));

                        print('Saving as \'' + smallFilename + '\'')
                        newImg.save(smallFilename)

                # Add attribute if that doesn't exist
                if preslashFlag:
                    smallFilename = '/' + smallFilename

                photo['smallFilename'] = smallFilename
                #
            #
        #
    # Outside of loop
with open(photoIndex, 'w') as file:
    # save updated yaml file
    yaml.dump(photoList, file)
