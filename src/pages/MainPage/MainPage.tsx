// MainPage.tsx

import React, { ChangeEvent, useState, useEffect } from 'react';
import './MainPage.css';
import Navbar from '../../widgets/Navbar/Navbar';
import Card from '../../widgets/Card/Card';
import { useNavigate } from 'react-router-dom';
import testData from '../../data';

interface Data {
  requestID: number;
  roads: {
    Roadid: number;
    Name: string;
    Trustmanagment: number;
    Length: number;
    Paidlength: number;
    Category: string;
    Numberofstripes: string;
    Speed: number;
    Price: number;
    Image: string;
    Statusroad: string;
    Startofsection: number;
    Endofsection: number;
  }[];
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Data | null>({ requestID: 0, roads: [] });
  const [minLength, setMinLength] = useState<number | null>(null);

  const fetchData = async (minLength?: string) => {
    try {
      const url = minLength ? `/api/roads/?minLength=${minLength}` : '/api/roads/';
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка при выполнении запроса: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.log(error, testData);
      const result = { ...testData };
      if (minLength) {
        result.roads = testData.roads.filter((roads) => roads.Endofsection - roads.Startofsection >= parseInt(minLength));
      }
      setData(result);
      console.error('ошибка при выполннении запроса:', error);
    }
  };

  const handleMinLengthChange = (value: string) => {
    setMinLength(value !== '' ? parseInt(value) : null);
    const minLengthString = value !== '' ? parseInt(value).toString() : '';
    navigate(`?minLength=${minLengthString}`, { replace: true });
    fetchData(minLengthString);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const minLengthParam = urlSearchParams.get('minLength') || '';
    const parsedMinLength = minLengthParam !== null ? parseInt(minLengthParam) : null;
    if (parsedMinLength !== minLength) {
      setMinLength(parsedMinLength);
      fetchData(minLengthParam);
    }
  }, [minLength]);

  return (
    <div>
      <Navbar onMinLengthChange={handleMinLengthChange} />
      <div className="container">
        <div className="row">
          {data?.roads?.map((item) => (
            <div key={item.Roadid} className="col">
              <Card
                id={item.Roadid}
                name={item.Name}
                image={item.Image}
                price={item.Price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
