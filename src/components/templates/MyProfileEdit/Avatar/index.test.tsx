import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PutInput } from "@/pages/api/my/profile/edit";
import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile, setupMockServer } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { Avatar } from ".";

function TestComponent() {
  const { register, setValue } = useForm<PutInput>();
  return BasicLayout(
    <Avatar register={register} setValue={setValue} name="imageUrl" />
  );
}

setupMockServer(handleGetMyProfile());

test("「写真を変更する」ボタンがある", async () => {
  render(<TestComponent />);
  expect(
    await screen.findByRole("button", { name: "写真を変更する" })
  ).toBeInTheDocument();
});

test("画像のアップロードに成功した場合、画像の src 属性が変化する", async () => {
  mockUploadImage();
  render(<TestComponent />);
  expect(screen.getByRole("img").getAttribute("src")).toBeFalsy();
  export function selectImageFile(
    inputTestId = "file",
    fileName = "hello.png",
    content = "hello"
  ) {
    const user = userEvent.setup();
    const filePath = [`C:\\fakepath\\${fileName}`];
    const file = new File([content], fileName, { type: "image/png" });
    const fileInput = screen.getByTestId(inputTestId);
    const selectImage = () => user.upload(fileInput, file);
    return { fileInput, filePath, selectImage };
  }
  const { selectImage } = selectImageFile();
  await selectImage();
  await waitFor(() =>
    expect(screen.getByRole("img").getAttribute("src")).toBeTruthy()
  );
});

test("画像のアップロードに失敗した場合、アラートが表示される", async () => {
  mockUploadImage(500);
  render(<TestComponent />);
  const { selectImage } = selectImageFile();
  await selectImage();
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      "画像のアップロードに失敗しました"
    )
  );
});
