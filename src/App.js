import './App.css';
import 'react-dropdown/style.css';
import { useState } from 'react';
import { RgbColorPicker} from "react-colorful"
import { Tooltip} from '@mui/material';
import Dropdown from 'react-dropdown';
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import harmoniesPlugin from "colord/plugins/harmonies";
extend([namesPlugin]);
extend([harmoniesPlugin]);


function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}





function App() {
  const min = 0;
  const max = 255;

  const [value, setValue] = useState(1)

  const [color, setColor] = useState({ r: 255, g: 0, b: 255});

  const handleChange1 = event => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setValue(value);
    setColor({...color, r: value})

  };

  const handleChange2 = event => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setValue(value);
    setColor({...color, g: value})

  };

  const handleChange3 = event => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setValue(value);
    setColor({...color, b: value})

  };

  const paletteOptions = [
    { value: 'analogous', label: 'Analogous' },
    { value: 'complimentary', label: 'Complimentary' },
    { value: 'double-split-complimentary', label: 'Double-Split-Complimentary' },
    { value: 'rectangle', label: 'Rectangle' },
    { value: 'split-complimentary', label: 'Split-Complimentary' },
    { value: 'tetradic', label: 'Tetradic' },
    { value: 'triadic', label: 'Triadic' }
  ];

  const exportOptions = [
    { value: 'json', label: 'JSON file' },
    { value: 'txt', label: 'Text File' }
  ];

  const name = colord(rgbToHex(color.r, color.g, color.b)).toName({ closest: true })
  const defaultPaletteOption = paletteOptions[0];
  const defaultExportOption = exportOptions[0];

  const palette = colord(rgbToHex(color.r, color.g, color.b));
  const newPalette = palette.harmonies("double-split-complementary").map((c) => c.toHex());


  return (
    <div className="App">
      <h1 style={{
        
              fontWeight: 'bold'
            }}>Color Palette Generator </h1>
      <p>Generate a color palette in three easy steps!</p>
      <div class="flex-container">
        <div class="flex-child">
          <p style={{
              fontSize: 18,
              fontWeight: 'bold'
            }}>(1) Choose a color below or enter RGB or HEX values</p>
          <Tooltip title="Choose A Color From the Color Picker">
            <section className="resposive example">
              <RgbColorPicker color={color} onChange={(color) => setColor(color)}/>
            </section>
          </Tooltip>
          <div>
          <label>R: 
            <Tooltip title="Enter RGB value here">
              <input type="number" value={color.r} onChange={handleChange1}/>
            </Tooltip>
          </label>
        
          <label>G: 
          <Tooltip title="Enter RGB value here">
            <input type="number" value={color.g} onChange={handleChange2}/>
            </Tooltip>

          </label>
          <label>B: 
          <Tooltip title="Enter RGB value here">
            <input type="number" value={color.b} onChange={handleChange3}/>
            </Tooltip>

          </label>
            </div>
            <br/>
            <label>#hex:        
              <Tooltip title="Enter HEX value here">
              <input type="text"
              value={rgbToHex(color.r, color.g, color.b)} onChange={(event) => setColor(colord(event.target.value).toRgbString())}/>
              </Tooltip>

          </label>
        </div>

        <div class="flex-child">
          <p style={{
              fontSize: 18,
              fontWeight: 'bold'
            }}> Choosen Primary Color</p>
          <div
            style={{
              height: '82%',
              backgroundColor: rgbToHex(color.r, color.g, color.b),
              border: "black",
              borderStyle: "solid",
              borderWidth: "medium"

            }}
          >
            <div class="color-span">
            <p style={{
              color: colord(rgbToHex(color.r, color.g, color.b)).invert().toHex(),
              fontSize: 20,
              fontWeight: 'bold'
            }} >{name}</p>
            </div>
          </div>
        </div>
        <div class="flex-child">
          <div style={{
                  width:'300px'
                }}>
            <p style={{
              fontSize: 18,
              fontWeight: 'bold'
            }}>(2) Choose color palette generation method:</p>
            <Dropdown options={paletteOptions} value={defaultPaletteOption} placeholder="Select an option" />
            <div style={{
              backgroundColor: newPalette[0],
              border: "black",
              borderStyle: "solid",
              borderWidth: "medium",
              height: 22

            }}>

            </div >
            <div style={{
              backgroundColor: newPalette[1],
              border: "black",
              borderStyle: "solid",
              borderWidth: "medium",
              height: 22

            }}>

            </div>
            <div style={{
              backgroundColor: newPalette[2],
              border: "black",
              borderStyle: "solid",
              borderWidth: "medium",
              height: 22

            }}>

            </div>
            <div style={{
              backgroundColor: newPalette[3],
              border: "black",
              borderStyle: "solid",
              borderWidth: "medium",
              height: 22

            }}>

            </div>
            <div style={{
              backgroundColor: newPalette[4],
              border: "black",
              borderStyle: "solid",
              borderWidth: "medium",
              height: 22,
              

            }}>

            </div>
            <p style={{
              fontSize: 18,
              fontWeight: 'bold'
            }}>(3) Choose how you would like to export your results:</p>
            <Dropdown options={exportOptions} value={defaultExportOption} placeholder="Select an option" />
          </div>
        </div>
      </div>

    <p>Thank you for using this tool. If this is your first time here, welcome! </p>
    <p>Feel free to click around to learn more! If you would like some suggestions... </p>
    <b>Tips:</b>
    <ul>
      <li><b>RGB</b> (red, green, blue) is a universal way of describing a color in photo editing applications.</li>
      <li><b>#hex</b> is a portable way of describing a color on the web and is a widely used format!</li>
      <li>Click on the <b><em>new</em> color picker</b>, enter an RGB or a HEX value, to choose your primary color</li>
      <li>Color palette generation is based off of color harmonies. <a href="https://en.wikipedia.org/wiki/Harmony_(color)">Click here</a> to learn more about them.</li>
    </ul>
      

    </div>
  );
}

export default App;
