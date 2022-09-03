import { Container, Stack } from '@mui/system'
import React, { useContext } from 'react'
import Heart from '../assets/Heart'
import Header from '../Components/Header/Header'
import { SearchResult } from '../Contexts/ResultContext'
function ViewResult() {
    const { result } = useContext(SearchResult)
    console.log('logging result from page')
    console.log(result)
    return (
        <div>
            <Header />
            {/* <Container> */}
            <div className="moreView">
                <div className="heading">
                    <span>Quick Menu</span>
                    <span>View more</span>
                </div>
                <div className="cards mt-5">
                    <h5>Search Result for "{result.query}"</h5>
                    {result.map((product, i) => {
                        let date = product.postDate
                        let result = date.slice(0, 10);
                        product.date = result
                        return (
                            <div key={i} className="card"
                                onClick={() => {
                                    // setPostDetails(product)
                                    // route.push('/view')
                                }}>
                                <div className="favorite">
                                    <Heart></Heart>
                                </div>
                                <div className="image">
                                    <img src={product.url} alt="" />
                                </div>
                                <div className="content">
                                    <p className="rate">&#x20B9; {product.price} /-</p>
                                    <span className="kilometer">{product.category}</span>
                                    <p className="name">{product.name}</p>
                                    <span className="date">{product.date}</span>
                                </div>
                            </div>
                        )
                    })}
                    <p className='mt-2'> Displaying total of {result.length} items</p>
                </div>
            </div>
            {/* </Container> */}
        </div>
    )
}

export default ViewResult