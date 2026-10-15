// 상품 데이터 — 나중에 실제 쇼핑몰 API로 교체할 부분
const PRODUCTS = {
  knit: [
    { name: 'Cashmere 100 Wrap Knit Burgundy', price: 458000, seed: 'k1', soldOut: true },
    { name: 'Cashmere 100 V-neck Knit Gray',   price: 398000, seed: 'k2', soldOut: true },
    { name: 'Double-knit Cardigan Khaki Brown', price: 528000, seed: 'k3' },
    { name: 'Padded Cardigan Lavender',         price: 498000, seed: 'k4' },
  ],
  denim: [
    { name: '940 Pintuck Denim', price: 268000, seed: 'd1' },
    { name: '918 Soul Denim',    price: 248000, seed: 'd2', soldOut: true },
    { name: '421 Washed Denim',  price: 238000, seed: 'd3' },
  ],
  bag: [
    { name: 'Moon Bag',     price: 368000, seed: 'b1', type: 'object' },
    { name: 'Weekend Tote', price: 428000, seed: 'b2', type: 'object' },
    { name: 'Soft Shopper', price: 398000, seed: 'b3', type: 'object' },
  ],
};
