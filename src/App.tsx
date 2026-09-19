import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DrawerMenu } from './components/DrawerMenu';
import { SearchModal } from './components/SearchModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HomeScreen } from './components/HomeScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { CartScreen } from './components/CartScreen';
import { AccountScreen } from './components/AccountScreen';
import { AddressModal } from './components/AddressModal';
import { OrderDetailModal } from './components/OrderDetailModal';
import { CouponModal } from './components/CouponModal';
import { SupportModal } from './components/SupportModal';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { Toast } from './components/Toast';

import { PRODUCTS } from './data/mockData';
import { INITIAL_REVIEWS } from './data/reviews';
import { TabType, Product, CartItem, OrderRecord, UserAddress, Review } from './types';
import { storage } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<Product['category'] | 'all'>('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState<boolean>(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState<boolean>(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState<boolean>(false);
  const [supportOrderContext, setSupportOrderContext] = useState<string | null>(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<OrderRecord | null>(null);

  // Persistent States initialized from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => storage.getCart());
  const [wishlist, setWishlist] = useState<Product[]>(() => storage.getWishlist());
  const [orders, setOrders] = useState<OrderRecord[]>(() => storage.getOrders());
  const [addresses, setAddresses] = useState<UserAddress[]>(() => storage.getAddresses());
  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
    const saved = storage.getAddresses();
    return saved.find((a) => a.isDefault)?.id || saved[0]?.id || 'addr-1';
  });
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => storage.getCoupon());
  const [reviewsMap, setReviewsMap] = useState<Record<string, Review[]>>(INITIAL_REVIEWS);

  // Sync back to localStorage whenever states change
  useEffect(() => {
    storage.saveCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    storage.saveWishlist(wishlist);
  }, [wishlist]);

  useEffect(() => {
    storage.saveOrders(orders);
  }, [orders]);

  useEffect(() => {
    storage.saveAddresses(addresses);
  }, [addresses]);

  useEffect(() => {
    storage.saveCoupon(appliedCoupon);
  }, [appliedCoupon]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Cart actions
  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + 1
        };
        return next;
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    showToast(`Added ${product.name} (${size}) to Bag!`);
  };

  const handleBuyNow = (product: Product, size: string) => {
    handleAddToCart(product, size);
    setActiveProductModal(null);
    setActiveTab('cart');
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
    showToast('Item removed from shopping bag.');
  };

  // Wishlist actions
  const isProductWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const handleToggleWishlist = (product: Product) => {
    if (isProductWishlisted(product.id)) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed from Wishlist.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved ${product.name} to Wishlist!`);
    }
  };

  const handleRemoveWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    showToast('Removed from Wishlist.');
  };

  const handleMoveToCartFromWishlist = (product: Product, size = 'M') => {
    handleAddToCart(product, size);
    handleRemoveWishlist(product.id);
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => {
      handleAddToCart(item, item.sizes[0] || 'M');
    });
    setWishlist([]);
    showToast('Moved all saved items to shopping bag!');
  };

  // Category selection handler
  const handleSelectCategory = (categorySlug: Product['category'] | 'all') => {
    setSelectedCategory(categorySlug);
    setActiveTab('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Coupon handling
  const handleApplyCoupon = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'EXTRA10' || formatted === 'RELOAD10' || formatted === 'FESTIVE15') {
      setAppliedCoupon(formatted);
      showToast(`Applied promo code ${formatted}!`);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.');
  };

  // Address management
  const handleAddAddress = (newAddrData: Omit<UserAddress, 'id' | 'isDefault'>) => {
    const newId = `addr-${Date.now()}`;
    const newAddress: UserAddress = {
      ...newAddrData,
      id: newId,
      isDefault: addresses.length === 0
    };
    setAddresses((prev) => [newAddress, ...prev]);
    setSelectedAddressId(newId);
    showToast('New delivery address saved!');
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (selectedAddressId === id && filtered.length > 0) {
        setSelectedAddressId(filtered[0].id);
      }
      return filtered;
    });
    showToast('Address removed.');
  };

  // Order Placement
  const handleCompleteOrder = (
    total: number,
    items: CartItem[],
    addressText: string,
    paymentMode: string
  ) => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderRecord = {
      id: orderId,
      date: 'Today',
      items: items.map((it) => ({
        name: it.product.name,
        image: it.product.image,
        size: it.size,
        quantity: it.quantity,
        price: it.product.price
      })),
      totalAmount: total,
      status: 'Processing',
      estimatedDelivery: 'Arriving in 2-3 Business Days',
      shippingAddress: addressText,
      paymentMethod: paymentMode,
      timeline: [
        {
          title: 'Order Placed & Confirmed',
          description: 'Payment authorized successfully; atelier assigned.',
          time: 'Just now',
          completed: true
        },
        {
          title: 'Quality Inspected & Packed',
          description: 'Double seam check & bespoke gift packaging in progress.',
          time: 'Estimated in 3 hrs',
          completed: false
        },
        {
          title: 'Dispatched with BlueDart Express',
          description: 'Waybill generated; priority flight reserved.',
          time: 'Tomorrow',
          completed: false
        },
        {
          title: 'Delivered to Doorstep',
          description: `Handed over at ${addressText}`,
          time: 'In 2-3 Days',
          completed: false
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setAppliedCoupon(null);
    showToast(`Order ${orderId} confirmed! Tracking details updated.`);
  };

  // Review submission
  const handleAddReview = (productId: string, newReview: Omit<Review, 'id' | 'date'>) => {
    const fullReview: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'Today'
    };
    setReviewsMap((prev) => ({
      ...prev,
      [productId]: [fullReview, ...(prev[productId] || [])]
    }));
    showToast('Your verified review has been submitted!');
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex justify-center selection:bg-[#C5A059] selection:text-black">
      {/* Mobile-First Shell with Desktop Centering */}
      <div className="w-full max-w-md bg-[#0B0B0B] min-h-screen relative shadow-2xl border-x border-[#1C1C1C] flex flex-col">
        {/* Top Header */}
        <Header
          cartCount={totalCartCount}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCart={() => setActiveTab('cart')}
          onOpenApkModal={() => setIsApkModalOpen(true)}
          onGoHome={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Screen Content Render */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <HomeScreen
              onSelectProduct={(product) => setActiveProductModal(product)}
              onSelectCategory={handleSelectCategory}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={isProductWishlisted}
              onOpenApkModal={() => setIsApkModalOpen(true)}
              onNavigateCategories={() => {
                setSelectedCategory('all');
                setActiveTab('categories');
              }}
              onApplyPromoCode={(code) => {
                handleApplyCoupon(code);
                setActiveTab('cart');
              }}
              onOpenInstagramLook={() => {
                showToast('Viewing Lookbook: Tagged in #ReloadLuxury');
                setActiveProductModal(PRODUCTS[0]);
              }}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesScreen
              products={PRODUCTS}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectProduct={(product) => setActiveProductModal(product)}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={isProductWishlisted}
            />
          )}

          {activeTab === 'wishlist' && (
            <WishlistScreen
              wishlist={wishlist}
              onRemoveWishlist={handleRemoveWishlist}
              onMoveToCart={handleMoveToCartFromWishlist}
              onSelectProduct={(product) => setActiveProductModal(product)}
              onBrowseShopping={() => {
                setSelectedCategory('all');
                setActiveTab('categories');
              }}
              onMoveAllToCart={handleMoveAllToCart}
            />
          )}

          {activeTab === 'cart' && (
            <CartScreen
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveCartItem}
              onBrowseShopping={() => {
                setSelectedCategory('all');
                setActiveTab('categories');
              }}
              onSelectProduct={(product) => setActiveProductModal(product)}
              onCompleteOrder={handleCompleteOrder}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onOpenAddressModal={() => setIsAddressModalOpen(true)}
              onOpenCouponModal={() => setIsCouponModalOpen(true)}
            />
          )}

          {activeTab === 'account' && (
            <AccountScreen
              orders={orders}
              onTrackOrder={(orderId) => {
                const found = orders.find((o) => o.id === orderId);
                if (found) {
                  setActiveTrackingOrder(found);
                } else {
                  showToast(`Tracking status for ${orderId}: Dispatched via BlueDart Express.`);
                }
              }}
              onSelectCategory={handleSelectCategory}
              addresses={addresses}
              onOpenAddressModal={() => setIsAddressModalOpen(true)}
              onOpenApkModal={() => setIsApkModalOpen(true)}
              onOpenSupport={(orderId) => {
                setSupportOrderContext(orderId || null);
                setIsSupportModalOpen(true);
              }}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          cartCount={totalCartCount}
          wishlistCount={wishlist.length}
        />

        {/* Sliding Navigation Drawer */}
        <DrawerMenu
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onSelectCategory={(category) => {
            handleSelectCategory(category);
          }}
          onSelectCollection={(name) => {
            showToast(`Browsing Collection: ${name}`);
            handleSelectCategory('all');
          }}
          onOpenAppPromo={() => {
            handleApplyCoupon('EXTRA10');
            setActiveTab('cart');
          }}
          onOpenApkModal={() => setIsApkModalOpen(true)}
        />

        {/* Live Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={PRODUCTS}
          onSelectProduct={(product) => {
            setActiveProductModal(product);
          }}
        />

        {/* Product Quick-View Detail Sheet */}
        <ProductDetailModal
          product={activeProductModal}
          isOpen={!!activeProductModal}
          onClose={() => setActiveProductModal(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={activeProductModal ? isProductWishlisted(activeProductModal.id) : false}
          onBuyNow={handleBuyNow}
          productReviews={activeProductModal ? reviewsMap[activeProductModal.id] || [] : []}
          onAddReview={handleAddReview}
        />

        {/* Delivery Address Management Modal */}
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onSelectAddress={(id) => {
            setSelectedAddressId(id);
            setIsAddressModalOpen(false);
            showToast('Delivery address updated.');
          }}
          onAddAddress={handleAddAddress}
          onDeleteAddress={handleDeleteAddress}
        />

        {/* Coupons Dialog Modal */}
        <CouponModal
          isOpen={isCouponModalOpen}
          onClose={() => setIsCouponModalOpen(false)}
          appliedCoupon={appliedCoupon}
          onSelectCoupon={(code) => {
            handleApplyCoupon(code);
          }}
        />

        {/* Order Details & Live Tracking Modal */}
        <OrderDetailModal
          isOpen={!!activeTrackingOrder}
          order={activeTrackingOrder}
          onClose={() => setActiveTrackingOrder(null)}
          onSupportHelp={(orderId) => {
            setActiveTrackingOrder(null);
            setSupportOrderContext(orderId);
            setIsSupportModalOpen(true);
          }}
        />

        {/* VIP Support & Concierge Modal */}
        <SupportModal
          isOpen={isSupportModalOpen}
          onClose={() => {
            setIsSupportModalOpen(false);
            setSupportOrderContext(null);
          }}
          orderIdContext={supportOrderContext}
        />

        {/* Mobile APK & PWA Installation Modal */}
        <ApkDownloadModal
          isOpen={isApkModalOpen}
          onClose={() => setIsApkModalOpen(false)}
        />

        {/* Floating Notification Toast */}
        <Toast message={toastMessage} />
      </div>
    </div>
  );
}

