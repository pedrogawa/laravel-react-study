import { createInertiaApp } from '@inertiajs/inertia-react'
import { createRoot } from 'react-dom/client'
import MainLayout from './Layouts/MainLayout';

createInertiaApp({
  id: 'app',
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    let page = pages[`./Pages/${name}.tsx`]
    page.default.layout = page.default.layout || (page => <MainLayout children={page} />)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})