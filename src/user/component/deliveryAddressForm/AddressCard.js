const AddressCard = ({ address }) => {
    return (
        <div>
            <div className="space-y-3">
                <p className="font-semibold">{address?.firstname} {address?.lastname}</p>
                <p>{address?.city}, {address?.address}, {address?.zipCode}</p>
                <div className="space-y-1">
                    <p className="font-semibold">Phone Number</p>
                    <p>{address?.phoneNumber}</p>
                </div>
            </div>
        </div>
    )
}

export default AddressCard
