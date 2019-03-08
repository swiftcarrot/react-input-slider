const track = {
  position: 'relative',
  display: 'inline-block',
  backgroundColor: '#ddd',
  borderRadius: 5
};

const active = {
  position: 'absolute',
  backgroundColor: '#5e72e4',
  borderRadius: 5
};

const thumb = {
  position: 'relative',
  display: 'block',
  content: '""',
  width: 18,
  height: 18,
  backgroundColor: '#fff',
  borderRadius: '50%',
  boxShadow: '0 1px 1px rgba(0,0,0,.5)'
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
      position: 'absolute',
      '&:after': {
        ...thumb,
        top: -4,
        left: -thumb.width / 2
      }
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
      position: 'absolute',
      '&:after': {
        ...thumb,
        top: -thumb.height / 2,
        left: -4
      }
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
      position: 'absolute',
      '&::after': {
        ...thumb,
        top: -thumb.width / 2,
        left: -thumb.height / 2
      }
    }
  }
};

export default styles;
