// RoadPage.tsx

import React, { useEffect, useState } from 'react';
import './RoadPage.css';
import Navbar from '../../widgets/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import testData from '../../data';

interface RoadData {
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
}

const RoadPage: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<RoadData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/roads/${id}`);
      if (!response.ok) {
        throw new Error(`Ошибка при выполнении запроса: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setData(testData.roads[parseInt(id || '0', 10) - 1]);
      console.error('ошибка при выполнении запроса:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="content">
          <h1>{data?.Name}</h1>

          <div className="road-details">
            <div className="road-image">
              <img
                src={data?.Image}
                alt={data?.Name}
              />
            </div>
            <div className="road-info">
              <ul>
                <li>В доверительном управлении: {data?.Trustmanagment} км</li>
                <li>Начало участка: {data?.Startofsection} км</li>
                <li>Конец участка: {data?.Endofsection} км</li>
                <li>Протяженность трассы: {data?.Length} км</li>
                <li>Протяженность платных участков: {data?.Paidlength} км</li>
                <li>Категория дороги: {data?.Category}</li>
                <li>Число полос движения: {data?.Numberofstripes}</li>
                <li>Разрешенная скорость: до {data?.Speed} км/ч</li>
                <li>Стоимость проезда: {data?.Price} руб</li>
                <li>
                  <button className="add-button">Добавить</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadPage;
