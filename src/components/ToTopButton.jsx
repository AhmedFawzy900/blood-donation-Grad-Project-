import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState , useEffect} from 'react';
const ToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scorlled upto given distance
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
    
        return () => {
          window.removeEventListener('scroll', toggleVisibility);
        };
      }, []);
      
    return (
        isVisible &&
        <button
            onClick={scrollToTop}
            className="to-top-btn"
        >
            <ExpandLessIcon />
        </button>
    );
}

export default ToTopButton