import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/static/Gallery.css';


const Gallery = ({ data }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const openModal = (index) => {
        setCurrentImageIndex(index);
        setModalOpen(true);
        console.log(index)
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const changeSlide = (direction) => {
        let newIndex = currentImageIndex + direction;
        if (newIndex >= images.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = images.length - 1;
        }
        setCurrentImageIndex(newIndex);

    };

    const images = Array.isArray(data) ? data.map(item => item.image) : [];

    return (
        <div className="gallery-container">
            <div className="gallery">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`image${index}`} onClick={() => openModal(index)} />
                ))}
            </div>

            {isModalOpen && (
                <div className="modal1">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <span className="prev" onClick={() => changeSlide(-1)}>&#10094;</span>
                    <span className="next" onClick={() => changeSlide(1)}>&#10095;</span>
                    <img className="modal1-content" src={images[currentImageIndex]} alt={`image${currentImageIndex}`} />
                    {/* <div className="caption1-container">
                        <p>{`image${currentImageIndex + 1}`}</p>
                    </div> */}
                    <div className="thumbnail-container">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`thumbnail${index}`}
                                onClick={() => setCurrentImageIndex(index)}
                                className={index === currentImageIndex ? 'active' : ''}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

Gallery.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        created_by: PropTypes.any,
        updated_by: PropTypes.any,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        is_active: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        task: PropTypes.number.isRequired,
    })).isRequired
};

export default Gallery;
