// This file contains tile layer configurations for the map.

// tile layer urls
export const tileLayers = [
    {
      name: "OpenStreetMap",
      url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      checked: true, // Set OpenStreetMap as the default layer
    },
    {
      name: "Google Maps 1",
      url: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga",
    },
    {
      name: "Google Maps 2",
      url: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga",
    },
    // {
    //   name: "Minimal Light",
    //   url: "https://api.mapbox.com/styles/v1/divcsoni99/clf9jbl3d004501qolng7pt76/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGl2Y3Nvbmk5OSIsImEiOiJjbGYydHV1NDgwNWoyM3NvMXR4bXZra2VyIn0._t8rySAgLoxsMRl0UwvBUg",
    // },
    // Add more tile layers as needed
  ];