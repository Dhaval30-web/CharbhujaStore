import React, { useContext, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Slide from '@mui/material/Slide';
import { MyContext } from "../../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CityDropdown = () => {

    const[isOpenModel, setisOpenModel] = useState(false);
    const[selectedTab, setSelectedTab] = useState(null);
    
    const [areaList, setAreaList] = useState([]);

    const context = useContext(MyContext);

    const selectArea = (index, name)=> {
        setSelectedTab(index);
        setisOpenModel(false);
        context.setSelectedArea(name)
    }

    useEffect(()=> {
        setAreaList(context.areaList);
    },[context.areaList]);

    const FilterList = (e)=> {
        const keyword = e.target.value.toLowerCase();

       if(keyword !== "")
       {
         const list = context.areaList.filter((item)=>{
            return item.name.toLowerCase().includes(keyword);
         });

         setAreaList(list);
       }

       else
       {
            setAreaList(context.areaList);
       }
    }

    return(
        <>
            <Button className='cityDrop' onClick={()=>setisOpenModel(true)}>
                <div className='info d-flex flex-column'>
                    <span className="lable">Your Location</span>

                    <span className="name">
                        {
                            context.selectedArea !== "" 
                            ? context.selectedArea.length>10 ?
                            context.selectedArea ?.substr(0,10)+'...' :
                            context.selectedArea
                            : 'Select Location'
                        }
                    </span>
                </div>
                <span className="ml-auto"><FaAngleDown /></span>
            </Button>

            <Dialog open={isOpenModel} onClose={()=>setisOpenModel(false)} 
                className="loctionModal" slots={{transition: Transition,}}>
                <h5 className='mb-0'>Choose Your Delivery Location</h5>
                <p>Enter your address and will be specify the offer for your area.</p>
                <Button className="closeButton" onClick={()=>setisOpenModel(false)}><IoClose/></Button>

                <div className='headerSearch w-100'>
                    <input type='text' placeholder='Search Your Area...'
                        onChange={FilterList}
                    />
                    <Button><IoSearch/></Button>
                </div>

                <ul className="areaList mt-3">
                    {
                        areaList?.length !==0 && areaList?.map((item, index)=> {
                            return(
                                <li key={item.id}><Button onClick={()=>selectArea(index,item.name)}
                                    className={`${selectedTab === index ? 'active' : ''}`}
                                >{item.name}</Button></li>
                            )
                        })
                    }
                </ul>
                
            </Dialog>
        </>
    );
    
}

export default CityDropdown;