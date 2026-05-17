import { IoSearch } from "react-icons/io5";
import Button from '@mui/material/Button';

const SearchBox =()=> {
    return (
        <>
        {/* Start Search Button */}
            <div className='headerSearch ml-3 mr-3'>
                <input type='text' placeholder='Search For Products...'/>
                <Button><IoSearch/></Button>
            </div>
        {/* End Search Button */}
        </>

    );
}

export default SearchBox;