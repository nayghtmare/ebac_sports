import { useEffect, useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from './store'
import {
  adicionarItem,
  adicionarFavorito,
  removerFavorito
} from './store/carrinhoSlice'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const produtosCarrinho = useSelector(
    (state: RootState) => state.carrinho.itens
  )
  const favoritos = useSelector((state: RootState) => state.carrinho.favoritos)

  const [produtosApi, setProdutosApi] = useState<Produto[]>([])

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/ebac_sports')
      .then((res) => res.json())
      .then((res) => setProdutosApi(res))
  }, [])

  function adicionarAoCarrinho(produto: Produto) {
    dispatch(adicionarItem(produto))
  }

  function favoritar(produto: Produto) {
    if (favoritos.find((f) => f.id === produto.id)) {
      dispatch(removerFavorito(produto.id))
    } else {
      dispatch(adicionarFavorito(produto))
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={produtosCarrinho} />
        <Produtos
          produtos={produtosApi}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
