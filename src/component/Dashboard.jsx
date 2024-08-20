import { useSelector ,useDispatch} from 'react-redux';
import { useState } from 'react';
import AddWidget from './AddWidget';
import { Category } from './Category';
import { removeWidget } from '../features/dashboardSlice';

export const Dashboard = () => {
  
  const dashboard = useSelector((state) => state.dashboard.data);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = (widgetsToRemove) => {
    Object.keys(widgetsToRemove).forEach((categoryIndex) => {
      widgetsToRemove[categoryIndex].forEach((widgetIndex) => {
        dispatch(removeWidget({ categoryIndex: parseInt(categoryIndex), widgetIndex }));
      });
    });
  };

  return (
    <div className='bg-blue-50 px-4 pt-8'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>CNAPP Dashboard</h2>
        <div className='flex space-x-4'>
          <button className='bg-white hover:bg-gray-100 border border-gray-300 py-2 px-2 rounded' onClick={() => setModalOpen(true)}>
            Add Widget +
          </button>
          <button className='bg-white hover:bg-gray-100 py-2 px-2 rounded'>
            ()
          </button>
          <button className='bg-white hover:bg-gray-100 py-2 px-2 rounded'>
            O| Last 2 days
          </button>
        </div>
      </div>
      
      {dashboard.map((category, index) => (
        <Category key={index} Category={category} categoryIndex={index} />
      ))}

{isModalOpen&&
      <AddWidget 
      isOpen={isModalOpen}
      onClose={() => setModalOpen(false)}
      onConfirm={handleConfirm}
      />
    }
    </div>
  );
};
