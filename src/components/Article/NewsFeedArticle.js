import React, {useState, useEffect} from "react";
import {Button} from "primereact/button";
import { Dialog } from 'primereact/dialog';
import {isMobile} from "react-device-detect";
import { Divider } from 'primereact/divider';
import {createAxios} from "../../utils/Helpers/AxiosHelper";
import { MultiSelect } from 'primereact/multiselect';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from "primereact/inputtext";
import {toast} from "react-toastify";
import {isLogin} from "../../utils/Helpers/UserHelper";


const NewsFeedArticle = (props) => {
    const api = createAxios();
    const [openDialog, setOpenDialog] = useState(false);
    const [author, setAuthor] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState([])
    const [sources, setSources] = useState([])

    useEffect(()=>{
        setSources(props.sources)
        setCategories(props.categories)
    }, [props.categories, props.sources])




    const onSave = async (e) => {
        if (isLogin()){
            e.preventDefault();
            if (isSubmitting) return;

            setIsSubmitting(true);
            const categoriesIds = selectedCategories.map(category => category.id);
            const sourcesIds = selectedSources.map(source => source.id);


            api.post('save-news-feed', {
                categories: categoriesIds,
                sources: sourcesIds,
                author: author
            }).then((response) => {
                const data = response.data
                toast('Successfully added', {
                    type: 'success',
                    autoClose: 1000,
                })
                setOpenDialog(false)
            })
                .catch((error) => {
                    console.log({error: error?.response?.data?.message})
                    toast(error?.response?.data?.message + 'Getting error while save the favorites', {
                        type: 'error',
                        autoClose: 2000,
                    })
                }).finally(() => {
                setIsSubmitting(false);
            });
        }else {
            toast("Please login to be able to save", {
                type: 'error',
                autoClose: 2000,
            })
        }

    }




    return (
        <>
            <Button
                icon="pi pi-bookmark"
                label={"Personalized news feed"}
                rounded text raised severity="secondary"
                aria-label="Bookmark"
                className='mx-2 d-flex justify-content-center text-center btn btn-sm btn-outline-primary'
                style={{
                    height: "40px"
                }}
                onClick={()=>{
                    setOpenDialog(true)
                }}
            />
            <Dialog header="Mark Your news feed"
                    visible={openDialog}
                    style={{ width: isMobile ? '90vw' : '50vw' }}
                    onHide={() => {if (!openDialog) return;
                         setOpenDialog(false); }}
            >
                <div className="card flex justify-content-center">
                    <MultiSelect
                        value={selectedCategories}
                        onChange={(e) => setSelectedCategories(e.value)}
                        options={categories}
                        optionLabel="name"
                        placeholder="Select Categories"
                        maxSelectedLabels={3}
                        style={{
                        }}
                        className="w-full md:w-20rem" />
                </div>
                <div className="card flex justify-content-center my-5">
                    <MultiSelect
                        value={selectedSources}
                        onChange={(e) => setSelectedSources(e.value)}
                        options={sources}
                        optionLabel="name"
                        placeholder="Select Sources"
                        maxSelectedLabels={3}
                        style={{
                        }}
                        className="w-full md:w-20rem" />
                </div>
                <div className="card flex justify-content-center">
                    <FloatLabel>
                        <InputText
                            id="Author"
                            className='w-100'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <label htmlFor="Author" className='login-input-label'>Author</label>
                    </FloatLabel>
                </div>
                <Divider />
                <div className='d-flex justify-content-end'>
                    <Button label="Cancel" severity="secondary" rounded
                     className='mx-2 btn btn-sm btn-outline-primary'
                     onClick={()=>{
                         setOpenDialog(false)
                     }}
                    />
                    <Button label="Save" rounded
                     disabled={selectedCategories.length === 0 && selectedSources.length === 0}
                     className="btn btn-sm btn-outline-primary"
                     onClick={onSave}
                    />

                </div>
            </Dialog>

        </>
    )

}

export default NewsFeedArticle
