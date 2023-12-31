import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import UserPrivateComponent from "./../PrivacyComponent/UserPrivateComponent";

export default function CommonDelete({
	permission,
	deleteThunk,
	id,
	navigatePath,
	className,
}) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onDelete = async (id) => {
		var result = window.confirm("Are you sure you want to delete?");
		if (result) {
			const res = await dispatch(deleteThunk(id));

			if (res?.meta?.requestStatus === "fulfilled") {
				navigatePath && navigate(navigatePath);
			}
		}
	};

	return (
		<>
			<UserPrivateComponent permission={permission}>
				<DeleteOutlined
					onClick={() => onDelete(id)}
					className={`bg-red-600 ${
						className ? className : "p-2"
					} text-white rounded-md`}
				/>
			</UserPrivateComponent>
		</>
	);
}
