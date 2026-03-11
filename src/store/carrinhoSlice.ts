import type { Produto } from '../App'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CarrinhoState {
  itens: Produto[]
  favoritos: Produto[]
}

const initialState: CarrinhoState = {
  itens: [],
  favoritos: []
}

export const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarItem: (state, action: PayloadAction<Produto>) => {
      if (!state.itens.find((p: Produto) => p.id === action.payload.id)) {
        state.itens.push(action.payload)
      }
    },
    removerItem: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((p: Produto) => p.id !== action.payload)
    },
    adicionarFavorito: (state, action: PayloadAction<Produto>) => {
      if (!state.favoritos.find((p: Produto) => p.id === action.payload.id)) {
        state.favoritos.push(action.payload)
      }
    },
    removerFavorito: (state, action: PayloadAction<number>) => {
      state.favoritos = state.favoritos.filter(
        (p: Produto) => p.id !== action.payload
      )
    }
  }
})

export const {
  adicionarItem,
  removerItem,
  adicionarFavorito,
  removerFavorito
} = carrinhoSlice.actions

export default carrinhoSlice.reducer
