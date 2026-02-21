import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
  counting: 0,
  checkItem:false,
  chekcountitem:false
}

export const counterItemSlice = createSlice({
  name: 'counterItem',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.value = action.payload
    },
    removeItem: (state, action) => {
      //ลบตาม item id 
      state.value = state.value.filter((item) => item.ItemId !== action.payload)
    },
    updateItem: (state, action) => {
      const item = state.value.find((item) => item.Barcode === action.payload)
      if (item) {
        // state.checkItem=false;
        if (item.ScanQty < item.OrderQty) {
           item.ScanQty += 1
           
           state.counting += 1
        }
      
        if (item.ScanQty == item.OrderQty) {
          // state.counting += 1
          state.chekcountitem=true
        }
        else{
          state.chekcountitem=false
        }

       
      }else{
        state.checkItem=true;
      }

    },
    clearcheckitem:(state, action)=>{
      state.checkItem=false;
      state.chekcountitem=false;
    },
    addQty: (state, action) => {
      const item = state.value.find((item) => item.OrderlineId === action.payload)

      if (item) {
        if (item.ScanQty < item.OrderQty) {
          item.ScanQty += 1
        
           if (item.ScanQty == item.OrderQty) {
             state.chekcountitem=true
           }
           else{
             state.chekcountitem=false
           }
        }
      }
    },
    removeCountItem: (state, action) => {
      state.counting = 0;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem, addQty, removeCountItem,clearcheckitem } = counterItemSlice.actions

export default counterItemSlice.reducer