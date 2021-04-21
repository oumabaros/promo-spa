import authService from './api-authorization/AuthorizeService'
import { SideBar } from './SideBar';
import { Footer } from './Footer';
import { TopBarMenu } from './TopBarMenu';
import Copy from '../assets/Copy.svg';
import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export class FetchPromos extends Component {
    static displayName = FetchPromos.name;
    //Initialiaze 
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            value: '',
            copied: false,
            promos: [],
            loading: true
        };
    }

    componentDidMount() {
        //populate promos[]
        this.populatePromosData();
    }
    searchSpace = (event) => {
        //set keyword with value(s) in searchbox
        let keyword = event.target.value;
        this.setState({ search: keyword });
    };
    //function to toggle Status between True and False
    activateBonus = async (e) => {
        //set updatedProms to current values in promos[]
        const updatedProms = [...this.state.promos];
        //set status of clicked button to true or false esle return current value unset
        updatedProms.map((item) =>
            item.Id.toString() === e.target.id
                ? Object.assign(item, { Status: !item.Status })
                : item,

        );
        //set promos[] to udatedProms[] after click of 'Set Bonus' button
        this.setState({ promos: updatedProms });
        //log updated values of promos[] in console to confirm changes
        console.log([...this.state.promos]);
    };
    //function to reset element values. sets 'search' to null and re-render screen
    handleSubmit = (e) => {
        e.preventDefault();
        //get value in search box
        document.getElementById('txtSearch').value = '';
        //set search variable to null
        this.setState({ search: null });
    };
    //function to check if copy was succesful or failed
    copyItem = () => {
        this.setState({ copied: true });
    };

    //renderr screen elements with values
    static renderPromos(promos,search,searchSpace,hSubmit,aBonus,copyItem) {
                  
        //if promos[] is null, display 'No Promos'
        if (promos == null || promos.length === 0) {
            return <h5>No Promos</h5>;
        }
        //map promos[] array
        const items = promos
            //filter array with value in search
            .filter((data) => {
                if (search == null) return data;
                else if (
                    data.Description
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    data.Promocode.toLowerCase().includes(search.toLowerCase())
                ) {
                    return data;
                }
            })
            //return filtered data and populate elemnts
            .map((p) => {
                return (
                    <div key={p.Id}>
                        <div className="Card">
                            <div className="Promo">{p.Description}</div>

                            <div className="Description">Description</div>
                            <div className="PromoCode">Promocode</div>
                            <div className="Pro">
                                <div className="CardBody">
                                    <div>
                                        <input
                                            type="text"
                                            id={p.Promocode + p.Id}
                                            value={p.Promocode}
                                            className="ItPromoCode"
                                            onChange={({ target: { value } }) =>
                                                this.setState({ value, copied: false })
                                            }
                                        />

                                        <CopyToClipboard
                                            text={p.Promocode}
                                            onCopy={copyItem}
                                        >
                                            <div className="CopyPasteIcon">
                                                <button>
                                                    <img src={Copy} alt="Copy" />
                                                </button>
                                            </div>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                            {!p.Status && (
                                <div className="StandardBlue">
                                    <div className="BonusBody">
                                        <div className="ActiveBonus">
                                            <button id={p.Id} onClick={aBonus}>
                                                Activate Bonus
                      </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {p.Status && (
                                <div className="StandardBlue">
                                    <div className="BonusRed">
                                        <div className="ActiveBonus">
                                            <button id={p.Id} onClick={aBonus}>
                                                Deactivate Bonus
                      </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            });

        return (
            <div className="outer">
                <SideBar />
                <TopBarMenu />
                <div className="Services">
                    Services
          <div className="Filter">
                        <div className="FilterText">Filter</div>
                    </div>
                    <input
                        className="Glow"
                        id="txtSearch"
                        type="text"
                        ref={(input) => {
                            this.textInput = input;
                        }}
                        placeholder="Se...|"
                        onChange={(e) => searchSpace(e)}
                    />
                    <div className="Reset">
                        <div className="ResetBody">
                            <div className="ResetContent">
                                <button type="button" onClick={hSubmit}>
                                    Reset
                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {items}
                <Footer />
            </div>
        );
    }
    //render/display items by calling renderPromos() above
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchPromos.renderPromos(this.state.promos, this.state.search,
                this.searchSpace, this.handleSubmit, this.activateBonus, this.copyItem);

        return (
            <div>
                {contents}
            </div>
        );
    }
    //fill prmos[] with data after checking for authorization
    async populatePromosData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/promos/getpromos', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ promos: data, loading: false });
    }
}
