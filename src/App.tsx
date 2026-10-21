import { Board } from './pages/board'
import { Edit } from './pages/edit'
import { Home } from './pages/home'
import { View } from './pages/view'

// Routes: / · /board/<screen> · /edit/<screen>/<variant> · /view/<screen>/<variant>
export default function App() {
  const [page, screen, variant] = location.pathname.split('/').filter(Boolean)
  if (page === 'board' && screen) return <Board screen={screen} />
  if (page === 'edit' && screen && variant) return <Edit screen={screen} variant={variant} />
  if (page === 'view' && screen && variant) return <View screen={screen} variant={variant} />
  return <Home />
}
