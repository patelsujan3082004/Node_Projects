import { Link } from 'react-router-dom';
import { FiShoppingCart, FiEye, FiStar, FiTrendingUp, FiHeart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const BookCard = ({ book }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const discountedPrice = book.discount > 0 
    ? book.price * (1 - book.discount / 100) 
    : book.price;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    try {
      await addToCart(book._id, 1);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      return;
    }
    try {
      if (isInWishlist(book._id)) {
        await removeFromWishlist(book._id);
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(book._id);
        toast.success('Added to wishlist!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update wishlist');
    }
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-2xl shadow-soft-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-primary-200/40 group h-full flex flex-col overflow-hidden transform hover:-translate-y-3 hover:scale-[1.02]">
      <Link to={`/books/${book._id}`} className="block">
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={book.coverImage || 'https://via.placeholder.com/300x400?text=Book+Cover'}
            alt={book.title}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Enhanced Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {book.bestSeller && (
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center animate-pulse border border-white/20">
                <FiTrendingUp className="w-4 h-4 mr-2" />
                Bestseller
              </span>
            )}
            {book.featured && (
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/20">
                Featured
              </span>
            )}
          </div>

          {book.discount > 0 && (
            <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg border border-white/10">
              -{book.discount}%
            </span>
          )}

          {/* Enhanced Quick actions overlay */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 flex space-x-3">
            <button
              onClick={handleWishlistToggle}
              className={`p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 border-2 backdrop-blur-sm ${
                isInWishlist(book._id)
                  ? 'bg-red-500 text-white border-red-400 hover:bg-red-600 shadow-red-500/25'
                  : 'bg-white/95 dark:bg-gray-800/95 text-gray-600 dark:text-gray-300 border-white/30 dark:border-gray-600/30 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300'
              }`}
            >
              <FiHeart className={`w-6 h-6 ${isInWishlist(book._id) ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/books/${book._id}`;
              }}
              className="p-4 rounded-full bg-white/95 dark:bg-gray-800/95 text-gray-600 dark:text-gray-300 shadow-xl hover:text-primary-600 dark:hover:text-primary-400 backdrop-blur-sm transition-all duration-300 transform hover:scale-110 border-2 border-white/30 dark:border-gray-600/30 hover:border-primary-300"
            >
              <FiEye className="w-6 h-6" />
            </button>
          </div>
        </div>
      </Link>
      <div className="p-6 flex-1 flex flex-col">
        <Link to={`/books/${book._id}`}>
          <h3 className="font-bold text-lg mb-3 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 leading-tight text-gray-900 dark:text-white min-h-[3.5rem] flex items-start group-hover:text-primary-600 dark:group-hover:text-primary-400">
            {book.title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 font-medium">
          by {book.author?.name || 'Unknown Author'}
        </p>

        {/* Enhanced Rating */}
        <div className="flex items-center mb-5">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-5 h-5 transition-colors duration-300 ${
                  i < Math.floor(book.ratings?.average || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-3 font-medium">
            ({book.ratings?.count || 0} reviews)
          </span>
        </div>

        {/* Enhanced Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {book.discount > 0 ? (
              <>
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-extrabold text-[var(--primary)]">
                    ₹{discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{book.price.toFixed(2)}
                  </span>
                </div>
              </>
            ) : (
              <span className="text-3xl font-extrabold text-[var(--primary)]">
                ₹{book.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="text-right">
            <span className={`text-xs font-semibold px-3 py-2 rounded-full border-2 ${
              book.stock > 10
                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
                : book.stock > 0
                ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700'
                : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700'
            }`}>
              {book.stock > 10 ? 'In Stock' : book.stock > 0 ? `${book.stock} left` : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Enhanced Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={book.stock === 0}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg mt-auto transform hover:scale-105 ${
            book.stock === 0
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-[var(--primary)] text-white hover:brightness-90 hover:shadow-xl active:scale-95'
          }`}
        >
          <FiShoppingCart className="w-5 h-5" />
          <span>{book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;

