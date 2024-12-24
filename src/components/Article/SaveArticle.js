import React, {useState, useEffect} from "react";
import {Button} from "primereact/button";
import { Dialog } from 'primereact/dialog';
import {isMobile} from "react-device-detect";
import { Checkbox } from "primereact/checkbox";
import { Divider } from 'primereact/divider';
import {getSelectedIds} from "../../utils/Helpers/ArticleHelper";
import {createAxios} from "../../utils/Helpers/AxiosHelper";
import {toast} from "react-toastify";
import {isLogin} from "../../utils/Helpers/UserHelper";

const categories = [
    { name: "Just the Article", key: 'article' },
    { name: "Make the article's category as favorite", key: 'category' },
    { name: "Make the article's source as favorite", key: 'source' },
];

const SaveArticle = (props) => {
    const api = createAxios();
    const [favorites, setFavorites] = useState(props?.userFavorites);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isFavorite = favorites?.some(fav => fav?.article_id === props?.article?.id);


    useEffect(()=>{

    }, [localStorage.getItem('access_token')])

    const onCategoryChange = (e) => {
        let _selectedCategories = [...selectedCategories];

        if (e.checked)
            _selectedCategories.push(e.value);
        else
            _selectedCategories = _selectedCategories.filter(category => category.key !== e.value.key);

        setSelectedCategories(_selectedCategories);
    };

    const onSave = async (e) => {
        if (!isFavorite){
            if (isLogin()){
                e.preventDefault();
                if (isSubmitting) return;
                const favorites = selectedCategories;

                setIsSubmitting(true);

                const selectedIds = getSelectedIds(favorites, props.article);
                api.post('save-favorite', {
                    category_id: selectedIds['category_id'],
                    article_id: selectedIds['article_id'],
                    source_id : selectedIds['source_id'],
                }).then((response) => {
                    const data = response.data
                    setFavorites([...props.userFavorites, data?.data?.favorite]);
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
        }else {
            setOpenDialog(false)
            toast("Already added to the your favorites", {
                type: 'error',
                autoClose: 2000,
            })
        }


    }


    return (
        <>
            <Button
                icon="pi pi-bookmark"
                aria-label="Bookmark"
                className='mx-2 d-flex justify-content-center text-center btn btn-sm btn-outline-primary'
                tooltip={isLogin() ? '' : 'Login to be able to added'}
                disabled={isFavorite}
                onClick={()=>{
                    setOpenDialog(true)
                }}
                style={{
                    background: isFavorite ? '#214252' : '',
                    color: isFavorite ? 'white' : '',
                }}
            />
            <Dialog header="Mark this article as a favorite"
                    visible={openDialog}
                    style={{ width: isMobile ? '90vw' : '50vw' }}
                    onHide={() => {if (!openDialog) return;
                         setOpenDialog(false); }}
            >
                <div className="flex justify-content-center">
                    <div className="flex flex-column gap-3">
                        {categories.map((category) => {
                            return (
                                <div key={category.key} className="flex align-items-center my-2">
                                    <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectedCategories.some((item) => item.key === category.key)} />
                                    <label htmlFor={category.key} className="mx-2">
                                        {category.name}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
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
                     className="btn btn-sm btn-outline-primary"
                     disabled={selectedCategories.length === 0}
                     onClick={onSave}
                    />

                </div>
            </Dialog>

        </>
    )

}

export default SaveArticle
