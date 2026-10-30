// Unsplash images. Replace any ID with your own favourite photo from unsplash.com
const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  hero1: u('photo-1582510003544-4d00b7f74220', 1800),
  hero2: u('photo-1609766857041-ed402ea8069a', 1800),
  hero3: u('photo-1561361513-2d000a50f0dc', 1800),
  temple: u('photo-1605649487212-47bdab064df7', 1000),
  lamps: u('photo-1609766857041-ed402ea8069a', 800),
  deity: u('photo-1561361513-2d000a50f0dc', 800),
  kerala: u('photo-1602216056096-3b40cc0c9944', 800),
  festival: u('photo-1590050752117-238cb0fb12b1', 800),
};
export const GALLERY = ["/assets/t1.jpg", "/assets/t2.jpg", "/assets/t3.jpg", "/assets/t4.jpg", "/assets/t5.jpg", "/assets/m1.jpg", "/assets/m2.jpg", "/assets/m3.jpg"];
