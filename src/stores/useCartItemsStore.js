import { dissoc, assoc, isEmpty, evolve } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    set => ({
      cartItems: {},
      setSelectedQuantity: (slug, quantity) => {
        set(({ cartItems }) => {
          if (quantity <= 0 && isEmpty(quantity)) {
            return { cartItems: dissoc(slug, cartItems) };
          }

          return { cartItems: assoc(slug, String(quantity), cartItems) };
        });
      },
      removeCartItem: slug => set(evolve({ cartItems: dissoc(slug) })),
      clearCart: () => set({ cartItems: {} }),
    }),
    { name: "cart-items-store" }
  )
);
export default useCartItemsStore;

// const useCartItemsStore=create(set=>({
//     cartItems:[],
//     setSelectedQuantity:slug=>{
//         set(({cartItems})=>{
//             if(cartItems.includes(slug)){
//                 return {cartItems:without([slug],cartItems)}
//             }
//             return {cartItems:[slug,...cartItems]}
//         })
//     }
// }))
// export default useCartItemsStore;
