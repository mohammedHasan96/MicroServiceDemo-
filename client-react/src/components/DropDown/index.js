import React, { useState, useEffect } from 'react';
import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import asynchandler from '../../utils/asyncHandler';
import { API } from '../../constants';
import './index.css';

const { Option } = Select;

const DropDown = ({
  enableAddItem, placeholder, items, name, className, text, getURL, postURL, labelValue, ...restProps
}) => {
  const [newName, setName] = useState('');
  const [options, setOptions] = useState(items);
  const addItem = async () => {
    const result = await axios.post(`${API}${postURL}`, { name: newName });
    const { data } = result.data;
    setOptions([...options, data]);
    setName('');
  };

  const getData = async () => {
    if (getURL) {
      const result = await axios(`${API}${getURL}`);
      const { data } = result.data;
      setOptions(data);
    }
  };

  useEffect(() => {
    if (getURL) {
      asynchandler(getData, 'getData');
    }
  }, [getURL]);
  return (
    <Select
      className={`drop-down ${className}`}
      placeholder={placeholder}
      name={name}
      showSearch
      {...restProps}
      dropdownRender={(menu) => (
        <div>
          {menu}
          {enableAddItem ? (
            <>
              <Divider className="drop-down__divider" />
              <div className="add-item__form">
                <Input className="add-item__input " value={newName} onChange={(e) => setName(e.target.value)} />
                <span className="drop-down__span" onClick={addItem} role="button">
                  <PlusOutlined />
                  {' '}
                  {text}
                </span>
              </div>
            </>
          ) : null}
        </div>
      )}
    >
      {options.map((item) => (
        <Option key={labelValue ? item.name : item.id || item}>{item.name || item}</Option>
      ))}
    </Select>
  );
};

DropDown.propTypes = {
  name: PropTypes.string,
  enableAddItem: PropTypes.bool,
  placeholder: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  getURL: PropTypes.string,
  postURL: PropTypes.string,
};

DropDown.defaultProps = {
  enableAddItem: false,
  className: '',
  name: null,
  getURL: null,
  postURL: null,
  ...Select.defaultProps,
};

export default DropDown;
