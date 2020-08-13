import requireAll from './require-all'

requireAll(require.context('~/front/assets/svg/', true, /\.svg$/))
