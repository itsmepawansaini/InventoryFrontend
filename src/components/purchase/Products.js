import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, InputNumber, Row, Select } from "antd";

export default function ProductAdd({
  form,
  productList,
  productLoading,
  totalCalculator,
  subTotal,
}) {
  const handleSetInitial = (product, serial) => {
    const productArray = form.getFieldValue("purchaseInvoiceProduct");
    const findProduct = productList.find((pro) => pro.id === product);
    const newArray = productArray.map((product, index) => {
      if (index === serial) {
        return {
          ...product,
          productQuantity: !!findProduct.productQuantity ? 1 : 0,
          productSalePrice: findProduct.productSalePrice,
          productPurchasePrice: findProduct.productPurchasePrice,
        };
      } else {
        return product;
      }
    });

    form.setFieldsValue({
      purchaseInvoiceProduct: newArray,
    });
    totalCalculator(serial);
  };

  return (
    <>
      <Row className='' gutter={[5]}>
        <Col span={1}>
          <div className='font-weight-bold md:text-base xxs:text-xs'>SL</div>
        </Col>
        <Col span={6}>
          <div className='font-weight-bold md:text-base xxs:text-xs'>
            Product
          </div>
        </Col>
        <Col span={4}>
          <div className='font-weight-bold md:text-base xxs:text-xs'>
            Quantity
          </div>
        </Col>
        <Col span={4}>
          <div className='font-weight-bold md:text-base xxs:text-xs'>
            Unit Price
          </div>
        </Col>
        <Col span={4}>
          <div className='font-weight-bold md:text-base xxs:text-xs'>
            Sale Price
          </div>
        </Col>
        <Col span={3}>
          <div className='font-weight-bold md:text-base xxs:text-xs'>Total</div>
        </Col>
        <Col span={2}>
          <div className='md:text-base xxs:text-xs'>Delete</div>
        </Col>
      </Row>

      <hr style={{ backgroundColor: "black", marginTop: "0.5rem" }} />

      <Form.List
        name='purchaseInvoiceProduct'
        rules={[
          {
            required: true,
            message: "Product is required",
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            <div className='max-h-[200px] grid w-full overflow-y-auto overflow-x-visible mt-2'>
              {fields.map(({ key, name, ...restField }, index) => (
                <Row className='w-full' gutter={[5]} key={key}>
                  <Col span={1}>{index + 1}</Col>
                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      name={[name, "productId"]}
                      rules={[
                        {
                          required: true,
                          message: "Product is required",
                        },
                      ]}
                    >
                      <Select
                        placeholder='Select Product'
                        // className="w-full text-sm xxs:p-0 md:p-2"
                        showSearch
                        loading={productLoading}
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onChange={(product) => {
                          handleSetInitial(product, index);
                        }}
                      >
                        {productList?.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "productQuantity"]}
                      rules={[
                        {
                          required: true,
                          message: "quantity is required",
                        },
                      ]}
                    >
                      <InputNumber
                        // className="w-full text-sm xxs:p-0 md:p-2"

                        size={"small"}
                        placeholder='Quantity'
                        onChange={() => totalCalculator(index)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "productPurchasePrice"]}
                      rules={[
                        {
                          required: true,
                          message: "Price is required",
                        },
                      ]}
                    >
                      <InputNumber
                        size='small'
                        // className="w-full text-sm xxs:p-0 md:p-2"
                        placeholder='50000'
                        onChange={() => totalCalculator(index)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "productSalePrice"]}
                      rules={[
                        {
                          required: true,
                          message: "Price is required",
                        },
                      ]}
                    >
                      <InputNumber
                        size='small'
                        // className="w-full text-sm xxs:p-0 md:p-2"
                        placeholder='50000'
                        onChange={() => totalCalculator(index)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <div className='font-weight-bold totalMargin'>
                      {subTotal[index] || 0}
                    </div>
                  </Col>
                  <Col span={2}>
                    <Form.Item>
                      <button
                        shape='circle'
                        className='flex justify-center items-center bg-red-600 text-white p-2 rounded-md'
                        onClick={() => {
                          remove(name);
                          totalCalculator(index);
                        }}
                      >
                        <DeleteOutlined className='' />
                      </button>
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            </div>
            <Form.Item style={{ marginTop: "20px" }}>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Product
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}
