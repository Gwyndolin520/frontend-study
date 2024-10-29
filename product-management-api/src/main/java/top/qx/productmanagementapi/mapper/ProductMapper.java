package top.qx.productmanagementapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.qx.productmanagementapi.entity.Product;


@Mapper
public interface ProductMapper extends BaseMapper<Product> {

}