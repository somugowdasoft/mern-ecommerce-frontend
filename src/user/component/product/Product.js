import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import { filters, priceFilter } from '../../../data/fillter/FilterData'
import { FormControl, FormControlLabel, FormLabel, Pagination, Radio, RadioGroup } from '@mui/material'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { findProducts } from '../../../state/product/Action'


const Product = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const param = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.product);

    // Decode and parse query string parameters from the URL
    const decodedQueryString = decodeURIComponent(location.search);
    const searchParmms = new URLSearchParams(decodedQueryString);
    // Extract specific query parameters (color, size, price, and page) from the URL
    const colorValue = searchParmms.get("color")
    const sizeValue = searchParmms.get("size")
    const priceValue = searchParmms.get("price")
    const pageNumber = searchParmms.get("page")

    // Function to handle filter changes
    const hnadleFilter = (value, sectionId) => {
        // Get the current query parameters from the URL
        const searchParmms = new URLSearchParams(location.search)
        // Get the current values for the filter section
        let filterValue = searchParmms.getAll(sectionId)
        // If the value already exists in the filter, remove it, otherwise, add it
        if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
            filterValue = filterValue[0].split(",").filter((item) => item !== value)
            // If there are no values left in the filter, remove the parameter
            if (filterValue.length === 0) {
                searchParmms.delete(sectionId)
            }
        } else {
            filterValue.push(value)
        }

        // Update the query string with the new filter values
        if (filterValue.length > 0) {
            searchParmms.set(sectionId, filterValue.join(","))
        }
        // Navigate to the updated URL with the new query string
        const query = searchParmms.toString();
        navigate({ search: `?${query}` })
    }

    // Function to handle radio button filter changes
    const hnadleRadioFilterChange = (e, sectionId) => {
        const searchParmms = new URLSearchParams(location.search)
        searchParmms.set(sectionId, e.target.value)
        const query = searchParmms.toString();
        navigate({ search: `?${query}` })
    }

    // Function to handle pagination changes
    const handlePaginationChange = (e, value) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("page", value)
        const query = searchParams.toString();
        navigate({ search: `?${query}` })
    }

    // useEffect hook to dispatch action to fetch products based on filters
    useEffect(() => {
        const [minPrice, maxPrice] = priceValue && priceValue !== null ? priceValue.split("-").map(Number) : [0, Infinity];
        const data = {
            category: param.levelThree,
            color: colorValue || [],
            sizes: sizeValue || [],
            minPrice,
            maxPrice,
            pageNumber: pageNumber,
            pageSize: 10,
        }
        dispatch(findProducts(data))
    }, [dispatch, param.levelThree, colorValue, sizeValue, priceValue, pageNumber])

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex gap-3">
                                                        <div className="flex h-5 shrink-0 items-center">
                                                            <div className="group grid size-4 grid-cols-1">
                                                                <input
                                                                    defaultValue={option.value}
                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    type="checkbox"
                                                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                />
                                                                <svg
                                                                    fill="none"
                                                                    viewBox="0 0 14 14"
                                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                                >
                                                                    <path
                                                                        d="M3 8L6 11L11 3.5"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-[:checked]:opacity-100"
                                                                    />
                                                                    <path
                                                                        d="M3 7H11"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                                {priceFilter.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <FormLabel id="demo-radio-buttons-group-label" className="text-gray-900">{section.name}</FormLabel>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                <FormControl>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        {section.options.map((option) => (
                                                            <FormControlLabel value={option.id} control={<Radio />} label={option.label} />
                                                        ))}

                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto px-4 sm:px-6 lg:px-20">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="size-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6">
                            {/* Filters */}
                            <div>
                                <form className="hidden lg:block">
                                    {filters.map((section) => (
                                        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                                                        <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex gap-3">
                                                            <div className="flex h-5 shrink-0 items-center">
                                                                <div className="group grid size-4 grid-cols-1">
                                                                    <input
                                                                        defaultValue={option.value}
                                                                        defaultChecked={option.checked}
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        type="checkbox"
                                                                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                        onChange={() => hnadleFilter(option.value, section.id)}
                                                                    />
                                                                    <svg
                                                                        fill="none"
                                                                        viewBox="0 0 14 14"
                                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                                    >
                                                                        <path
                                                                            d="M3 8L6 11L11 3.5"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-[:checked]:opacity-100"
                                                                        />
                                                                        <path
                                                                            d="M3 7H11"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}
                                    {priceFilter.map((section) => (
                                        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <FormLabel id="demo-radio-buttons-group-label" sx={{ color: "black" }}>{section.name}</FormLabel>
                                                    <span className="ml-6 flex items-center">
                                                        <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                                                        <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            defaultValue="female"
                                                            name="radio-buttons-group"
                                                        >
                                                            {section.options.map((option) => (
                                                                <FormControlLabel
                                                                    value={option.value}
                                                                    control={<Radio />}
                                                                    label={option.label}
                                                                    onChange={(e) => hnadleRadioFilterChange(e, section.id)}
                                                                />
                                                            ))}

                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}
                                </form>
                            </div>

                            {/* Product grid */}
                            <div className="lg:col-span-5 w-full">
                                <div className="flex flex-wrap justify-start gap-x-12 gap-y-4 bg-white py-5">
                                    {product?.products?.data?.content?.length > 0 ? (
                                        product.products.data.content.map((item) => (
                                            <ProductCard key={item.id || item._id} product={item} />
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-lg">No products available.</p>
                                    )}
                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="w-full px-[54px]">
                        <div className="px-4 py-5 flex justify-center">
                            <Pagination count={product.products?.totalPages} color="secondary" onChange={handlePaginationChange} />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Product

