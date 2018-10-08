import Vivus from 'vivus';

console.log(Vivus)
const v = new Vivus('svg',
  {
    type: 'oneByOne',
    duration: 1000,
    start: 'autostart',
    onReady: (obj) => {
      console.log('ready', obj.el)
      // console.log(obj.el.dataset)
      // obj.el.setAttribute('data-hidden', "0");
      // obj.el.setAttribute('width', "0");
      const svg = document.querySelector('#svg')
      svg.setAttribute('data-hidden', "0");
    },
  },
  (obj) => {
    console.log(obj)
    console.log('done')
  }
);

// v
//   .reset()
//   .play()
