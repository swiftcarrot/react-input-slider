const track = {
  position: 'relative',
  display: 'inline-block',
  backgroundColor: '#ddd',
  borderRadius: 5,
  userSelect: 'none',
  boxSizing: 'border-box'
};

const active = {
  position: 'absolute',
  backgroundColor: '#5e72e4',
  borderRadius: 5,
  userSelect: 'none',
  boxSizing: 'border-box'
};

const thumb = {
  position: 'relative',
  display: 'block',
  content: '""',
  width: 18,
  height: 18,
  backgroundColor: '#fff',
  borderRadius: '50%',
  boxShadow: '0 1px 1px rgba(0,0,0,.5)',
  userSelect: 'none',
  boxSizing: 'border-box'
};

const styles = {
  x: {
    track: {
      ...track,
      width: 200,
      height: 10
    },

    active: {
      ...active,
      top: 0,
      height: '100%'
    },

    thumb: {
      ...thumb
    }
  },

  y: {
    track: {
      ...track,
      width: 10,
      height: 200
    },

    active: {
      ...active,
      left: 0,
      width: '100%'
    },

    thumb: {
      ...thumb
    }
  },

  xy: {
    track: {
      position: 'relative',
      overflow: 'hidden',
      width: 200,
      height: 200,
      backgroundColor: '#5e72e4',
      borderRadius: 0
    },

    active: {},

    thumb: {
      ...thumb
    }
  },

  disabled: {
    opacity: 0.5
  }
};

export default styles;
