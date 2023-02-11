import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { type ISourceOptions } from "tsparticles-engine";

import berry from "../assets/food/berry.png"
import cake from "../assets/food/cake.png"
import corn from "../assets/food/corn.png"
import fries from "../assets/food/fries.png"
import icecream from "../assets/food/icecream.png"
import noodles from "../assets/food/noodles.png"
import pineapple from "../assets/food/pineapple.png"
import pizza from "../assets/food/pizza.png"
import watermelon from "../assets/food/pizza.png"

export default function Canvas() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    return (
      <Particles 
          id="tsparticles"
          style={{
            position: "absolute",
            zIndex: 10,
            width: "100vw",
            height: "100vh",
            overflow: "visible",
          }}
          options={{
            "autoPlay": true,
            "background": {
              "color": {
                "value": "transparent"
              },
              "image": "",
              "position": "50% 50%",
              "repeat": "no-repeat",
              "size": "cover",
              "opacity": 1
            },
            "fullScreen": {
              "enable": true,
              "zIndex": -1
            },
            "detectRetina": true,
            "duration": 0,
            "fpsLimit": 120,
            "interactivity": {
              "detectsOn": "window",
              "events": {
                "onDiv": {
                  "selectors": "#repulse-div",
                  "enable": true,
                  "mode": "repulse",
                  "type": "circle"
                },
                "onHover": {
                  "enable": true,
                  "mode": "bubble",
                  "parallax": {
                    "enable": false,
                    "force": 30,
                    "smooth": 10
                  }
                },
                "resize": true
              },
              "modes": {
                "attract": {
                  "distance": 200,
                  "duration": 0.4,
                  "enable": false,
                  "easing": "ease-out-quad",
                  "factor": 1,
                  "maxSpeed": 50,
                  "speed": 1
                },
                "bounce": {
                  "distance": 200
                },
                "bubble": {
                  "distance": 400,
                  "duration": 2,
                  "mix": false,
                  "opacity": 0.8,
                  "size": 40
                },
                "connect": {
                  "distance": 80,
                  "links": {
                    "opacity": 0.5
                  },
                  "radius": 60
                },
                "grab": {
                  "distance": 400,
                  "links": {
                    "blink": false,
                    "consent": false,
                    "opacity": 1
                  }
                },
                "light": {
                  "area": {
                    "gradient": {
                      "start": {
                        "value": "#ffffff"
                      },
                      "stop": {
                        "value": "#000000"
                      }
                    },
                    "radius": 1000
                  },
                  "shadow": {
                    "color": {
                      "value": "#000000"
                    },
                    "length": 2000
                  }
                },
                "push": {
                  "default": true,
                  "groups": [],
                  "quantity": 4
                },
                "remove": {
                  "quantity": 2
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4,
                  "factor": 100,
                  "speed": 1,
                  "maxSpeed": 50,
                  "easing": "ease-out-quad"
                },
                "slow": {
                  "factor": 3,
                  "radius": 200
                },
                "trail": {
                  "delay": 1,
                  "pauseOnStop": false,
                  "quantity": 1
                }
              }
            },
            "manualParticles": [],
            "motion": {
              "disable": false,
              "reduce": {
                "factor": 4,
                "value": true
              }
            },
            "particles": {
              "bounce": {
                "horizontal": {
                  "value": 1
                },
                "vertical": {
                  "value": 1
                }
              },
              "collisions": {
                "bounce": {
                  "horizontal": {
                    "value": 1
                  },
                  "vertical": {
                    "value": 1
                  }
                },
                "enable": true,
                "mode": "bounce",
                "overlap": {
                  "enable": true,
                  "retries": 0
                }
              },
              "destroy": {
                "mode": "none",
                "split": {
                  "count": 1,
                  "factor": {
                    "value": 3
                  },
                  "rate": {
                    "value": {
                      "min": 4,
                      "max": 9
                    }
                  },
                  "sizeOffset": true
                }
              },
              "gradient": [],
              "groups": {},
              "life": {
                "count": 0,
                "delay": {
                  "value": 0,
                  "sync": false
                },
                "duration": {
                  "value": 0,
                  "sync": false
                }
              },
              "links": {
                "blink": false,
                "consent": false,
                "distance": 150,
                "enable": false,
                "frequency": 1,
                "opacity": 0.4,
                "width": 1,
                "warp": false
              },
              "move": {
                "angle": {
                  "offset": 0,
                  "value": 90
                },
                "attract": {
                  "distance": 200,
                  "enable": false,
                  "rotate": {
                    "x": 600,
                    "y": 1200
                  }
                },
                "decay": 0,
                "distance": {},
                "direction": "none",
                "drift": 0,
                "enable": true,
                "outModes": {
                  "default": "out",
                  "bottom": "out",
                  "left": "out",
                  "right": "out",
                  "top": "out"
                },
                "random": false,
                "size": false,
                "speed": 2,
                "straight": false,
                "vibrate": false,
                "warp": false
              },
              "number": {
                "density": {
                  "enable": true,
                  "area": 800,
                  "factor": 1000
                },
                "limit": 0,
                "value": 60
              },
              "opacity": {
                "random": {
                  "enable": true,
                  "minimumValue": 0.1
                },
                "value": {
                  "min": 0.1,
                  "max": 1
                },
                "animation": {
                  "count": 0,
                  "enable": true,
                  "speed": 1,
                  "sync": false,
                  "destroy": "none",
                  "startValue": "random",
                  "minimumValue": 0.2
                }
              },
              "reduceDuplicates": false,
              "rotate": {
                "random": {
                  "enable": true,
                  "minimumValue": 0
                },
                "value": 0,
                "animation": {
                  "enable": true,
                  "speed": 5,
                  "sync": false
                },
                "direction": "random",
                "path": false
              },
              "shape": {
                "options": {
                  "character": {
                    "fill": false,
                    "font": "Verdana",
                    "style": "",
                    "value": "*",
                    "weight": "400"
                  },
                  "char": {
                    "fill": false,
                    "font": "Verdana",
                    "style": "",
                    "value": "*",
                    "weight": "400"
                  },
                  "polygon": {
                    "sides": 5
                  },
                  "star": {
                    "sides": 5
                  },
                  "image": [
                    {
                      "src": berry.src,
                      "width": 32,
                      "height": 32
                    },
                    {
                      "src": cake.src,
                      "width": 32,
                      "height": 32
                    },
                    {
                        "src": corn.src,
                        "width": 32,
                        "height": 32
                    },
                    {
                        "src": fries.src,
                        "width": 32,
                        "height": 32
                    },
                    {
                        "src": icecream.src,
                        "width": 32,
                        "height": 32
                    },
                    {
                        "src": noodles.src,
                        "width": 32,
                        "height": 32
                    },
                    {
                        "src": pineapple.src,
                        "width": 32,
                        "height": 32
                    },
                    {
                        "src": pizza.src,
                        "width": 32,
                        "height": 32
                    },
                    {
                        "src": watermelon.src,
                        "width": 32,
                        "height": 32
                    }
                  ]
                },
                "type": "image"
              },
              "size": {
                "value": 18
              },
              "stroke": {
                "width": 0
              }
            },
            "pauseOnBlur": true,
            "pauseOnOutsideViewport": true,
            "responsive": [],
            "style": {},
            "themes": [],
            "zLayers": 100
          } as ISourceOptions} 
          init={particlesInit}
      />
    )
}