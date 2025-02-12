import React, { useEffect, useState } from 'react'
import { useFetchProductQuery } from '../Hooks/React Query/useReactQuery'
import { Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../Redux Toolkit/Slice/CoinSlice';
import SortIcon from '@mui/icons-material/Sort';
import Loader from '../UI/Loader';

const CoinList = () => {
    const { data, isLoading, isFetching, refetch} = useFetchProductQuery();

    const coin = useSelector((state)=>state.coin.coin)
    const dispatch = useDispatch();

    const[search, setSearch] = useState("");
    const[sorteddata,setSorteddata] = useState([]);
    const[sortorder, setSortorder] = useState({rank: "asc"})

    const[selectedProduct, setSelectedProduct] = useState(null); 
    const handleOpen = (product) => setSelectedProduct(product);
    const handleClose = () => setSelectedProduct(null); 

    useEffect(()=>{
        setSorteddata(data);
    },[data])

    const handlechange = (e)=>{
        setSearch(e.target.value.toLowerCase())
    }

    const handlesort = ()=>{
        const newsortorder = sortorder.rank === "asc" ? "desc" : "asc";
        const sorted = [...data].sort((a,b)=>newsortorder === "asc" ? a.rank-b.rank : b.rank-a.rank);
        setSorteddata(sorted);
        setSortorder((prev)=>({...prev, rank: newsortorder}))
    }

    const filterdata = sorteddata?.filter((item)=>item.id.toLowerCase().includes(search))
    
    const handlerefresh = ()=>{
        dispatch(reset());
        refetch();
    }

    if (isLoading) {
        return <h1><Loader/></h1>;
    }

    if (isFetching) {
        return <div><Loader/></div>;
    }

    return (
        <>
        <h1 style={{ color: "red", textAlign: "center" }}>Crypto Currency List <IconButton onClick={()=>handlerefresh(coin)}><RefreshIcon/></IconButton></h1>
            <Container>
            <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Search by Name"
                onChange={handlechange}
            />
            </Container>
           
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 150 }} aria-label="crypto currency table" size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank <IconButton onClick={()=>handlesort()}><SortIcon/></IconButton></TableCell>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Symbol</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Supply</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterdata?.map((item, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={()=>handleOpen(item)}>
                                <TableCell component="th" scope="row">{item.rank}</TableCell>
                                <TableCell align="right">{item.id}</TableCell>
                                <TableCell align="right">{item.symbol}</TableCell>
                                <TableCell align="right">{item.name}</TableCell>
                                <TableCell align="right">{item.supply}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
            {selectedProduct && (
            <Dialog
              open={!!selectedProduct}
              onClose={handleClose}
              maxWidth="sm"
              fullWidth>
              <DialogTitle style={{color:"red", textAlign:"center"}}>Crypto Details</DialogTitle>
              <DialogContent>
                <Typography variant="h5" color="text.primary">
                  <b>Product Details: {selectedProduct.rank}</b>
                </Typography>
                <Typography variant="h6" color="text.primary">
                  <b>Symbol: {selectedProduct.symbol}</b>
                </Typography>
                <Typography variant="h7" color="text.secondary">
                  <b>Name: {selectedProduct.name}</b>
                </Typography><br />
                <Typography variant="h8" color="text.secondary">
                  <b>Supply: {selectedProduct.supply}</b>
                </Typography>
              </DialogContent>
              <DialogActions>
              </DialogActions>
            </Dialog>
            )}    
            </div>
        </>
    );
};

export default CoinList;
