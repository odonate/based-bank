import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, MenuItem } from '@szhsin/react-menu';

import { networkConstants } from '@constants';

import styles from '@styles';

const CreateModal = ({ setIsCreateOpen }) => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.authService.login);

  const [product, setProduct] = useState({
    name: '',
    venueId: '',
    annualInterest: '',
    reserveRatio: '',
    balanceExtensionAddress: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Create", product);
    // dispathc some stuff
    setIsCreateOpen(false);
  };

  const overlay = <div className={styles.modalOverlay} onClick={() => setIsCreateOpen(false)}/>;
  const header = (
    <div className={styles.modalHeader}>
      <div className={styles.modalHeaderContainer}>
        <div className={styles.modalHeaderContent}>
          <div>Create New Product</div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {overlay}
      <div className={styles.sideModal}>
        <div className={styles.sideModalContent}>
          {header}
          <ProductForm
            product={product}
            setProduct={setProduct}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

const ProductForm = ({ product, setProduct, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((product) => ({
      ...product,
      [name]: value,
    }));
  };
  const [isClicked, setIsClicked] = useState({
    name: false,
    venueId: false,
    annualInterst: false,
    reserveRatio: false,
    balanceExtensionAddress: false,
  });
  const handleInputFocus = (name) => {
    setIsClicked((prevIsClicked) => ({
      ...prevIsClicked,
      [name]: true,
    }));
  };
  const handleInputBlur = (name) => {
    setIsClicked((prevIsClicked) => ({
      ...prevIsClicked,
      [name]: false,
    }));
  };

  const handleButton = (
    <div className={styles.actionButtonContainer}>    
      <button type="submit" className={styles.actionButton}>Submit</button>  
    </div>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.gridSection}>
          
          <div className={styles.gridLabel}>Product Name:</div>
          <div className={styles.gridValue}>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              onFocus={() => handleInputFocus('name')}
              onBlur={() => handleInputBlur('name')}
              className={isClicked.productName ? `${styles.formInput} ${styles.formInputClicked}` : `${styles.formInput}`}
              autoComplete="off"
              required/>
          </div>

          <div className={styles.gridLabel}>Network:</div>
          <div className={styles.gridValue}>
            <VenueDropDown product={product} setProduct={setProduct}/>
          </div>

          <div className={styles.gridLabel}>Annual Interest:</div>
          <div className={styles.gridValue}>
            <input
              type="text"
              name="annualInterest"
              placeholder={'e.g. 0.1 for 10%'}
              value={product.annualInterest}
              onChange={handleChange}
              onFocus={() => handleInputFocus('annualInterest')}
              onBlur={() => handleInputBlur('annualInterest')}
              className={isClicked.productName ? `${styles.formInput} ${styles.formInputClicked}` : `${styles.formInput}`}
              autoComplete="off"
              required/>
          </div>
          
          <div className={styles.gridLabel}>Reserve Ratio:</div>
          <div className={styles.gridValue}>
            <input
              type="text"
              name="reserveRatio"
              placeholder={'0 - 10000 (bps)'}
              value={product.reserveRatio}
              onChange={handleChange}
              onFocus={() => handleInputFocus('reserveRatio')}
              onBlur={() => handleInputBlur('reserveRatio')}
              className={isClicked.productName ? `${styles.formInput} ${styles.formInputClicked}` : `${styles.formInput}`}
              autoComplete="off"
              required/>
          </div>

          <div className={styles.gridLabel}>Address:</div>
          <div className={styles.gridValue}>
            <input
              type="text"
              name="balanceExtensionAddress"
              placeholder={'0x0000...000'}
              value={product.balanceExtensionAddress}
              onChange={handleChange}
              onFocus={() => handleInputFocus('balanceExtensionAddress')}
              onBlur={() => handleInputBlur('balanceExtensionAddress')}
              className={isClicked.productName ? `${styles.formInput} ${styles.formInputClicked}` : `${styles.formInput}`}
              autoComplete="off"
              required/>
          </div>
        </div>

        <button className={styles.actionButton}>SUBMIT</button>
      </form>
    </div>
  );
};

const VenueDropDown = ({ product, setProduct }) => {
  
  const networkIds = networkConstants.CHAIN_IDS;
  const networkLogo = networkConstants.ID_TO_LOGO;
  const networkParams = networkConstants.PARAMS;
  const chainIdToVenue = networkConstants.ID_TO_VENUE;

  const menuItems = (
    networkIds.map((key, index) => {
      const logo = <img src={networkLogo[key]} style={{ 'width': '10%', paddingRight: '10px' }}/>;
      return (
        <MenuItem
          key={index}
          className={styles.menuItem}
          onClick={(e) => {
            setProduct({
              ...product,
              ['venueId']: chainIdToVenue[key],
            });
          }}
        >
          {logo}
          {networkParams[key].chainName}
        </MenuItem>
      );
    })
  );
  
  const defaultColour = 'rgb(217, 217, 217)';
  const hoverColour = 'rgb(217, 21, 217)';
  const [colour, setColour] = useState(defaultColour);

  const handleMouseEnter = () => {
    setColour(hoverColour);
  };

  const handleMouseLeave = () => {
    setColour(defaultColour);
  };

  let venuePath = null;
  try {
    venuePath = require("@images/venues/" + product.venueId.toLowerCase() + ".png");
  } catch (error) {
    venuePath = require("@images/venues/null.png");
  }
  return (
    <Menu
      menuButton={
        <button
          className={styles.button}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => e.preventDefault()}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{paddingRight: '5px'}}>
              {product.venueId ? (
                <div>
                  <img src={venuePath} alt="Venue" style={{ width: 'auto', height: '16px' }} />
                  {product.venueId}
                </div>
              ): 'VENUE'}
            </div>
            {/* <DropDownIcon colour={colour}/> */}
          </div>
        </button>}
      align="center"
      direction="bottom"
      position="anchor"
      menuClassName={styles.menu}
      onClick={(e) => e.preventDefault()}
    >
      {menuItems}
    </Menu>
  );
};

export { CreateModal };
