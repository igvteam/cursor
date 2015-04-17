/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Broad Institute
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Created by turner on 4/15/15.
 */
var igv = (function (igv) {

    igv.ColorPicker = function (parentObject, palette) {

        var self = this,
            colorPickerHeader,
            colorPickerRect;


        this.colorPickerContainer = $('<div class="grid-container ui-widget-content">');
        parentObject.append( this.colorPickerContainer[ 0 ] );

        this.colorPickerContainer.draggable();

        colorPickerHeader = $('<div class="grid-header">');
        this.colorPickerContainer.append(colorPickerHeader[ 0 ]);

        igv.dialogCloseWithParentObject(colorPickerHeader, function () {
            self.hide();
        });

        colorPickerRect = $('<div class="grid-rect">');
        this.colorPickerContainer.append(colorPickerRect[ 0 ]);

        count(2).forEach(function(rowDigit, r, rowDigits){

            var colorPicker = $('<div class="grid-50 grid">');

            count(4).forEach(function(colDigit, c, colDigits){

                var column = $('<div class="col col-1-4 hvr-float">');

                //column.text(".col-1-4");

                column.css( { "background-color" : palette[ r ][ c ] } );

                column.click(function(){

                    igv.setTrackColor(self.trackView.track, igv.hex2Color( palette[ r ][ c ] ));
                    self.trackView.update();

                });

                colorPicker.append( column[ 0 ] );

            });

            colorPickerRect.append( colorPicker[ 0 ]);

        });

        function count(c) {

            var list = [];
            for (var i = 0; i < c; i++) {
                list.push(i);
            }

            return list;
        }
    };

    igv.ColorPicker.prototype.hide = function () {
        this.colorPickerContainer.hide();
    };

    igv.ColorPicker.prototype.show = function () {
        this.colorPickerContainer.show();
    };

    return igv;

})(igv || {});